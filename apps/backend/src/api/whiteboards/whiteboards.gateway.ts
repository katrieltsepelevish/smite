import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Namespace, Socket } from 'socket.io';

import { User } from '../users/user.entity';
import { JwtSocketGuard } from '../auth/guards/jwt-socket.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserUtil } from '../../shared/utils';

@UseGuards(JwtSocketGuard)
@WebSocketGateway({
  namespace: 'whiteboards',
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class WhiteboardsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly _logger = new Logger();
  private readonly _roomUsers: Map<string, Set<User & { socketId: string }>> =
    new Map();

  @WebSocketServer() _io: Namespace;

  @SubscribeMessage('whiteboard:joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @CurrentUser() user: User,
    @MessageBody() roomId: string,
  ): Promise<void> {
    client.join(roomId);

    if (!this._roomUsers.has(roomId)) {
      this._roomUsers.set(roomId, new Set());
    }

    this._roomUsers
      .get(roomId)
      ?.add({ ...(UserUtil.normalizeUser(user) as User), socketId: client.id });

    const usersInRoom = Array.from(this._roomUsers.get(roomId) || []);
    this._io.to(roomId).emit('whiteboard:joinedRoom', { users: usersInRoom });

    this._logger.log(
      `User ${user.firstname} ${user.lastname} joined ${roomId} whiteboard's room.`,
    );
  }

  async handleConnection(socket: Socket): Promise<void> {
    this._logger.log(
      `Socket connected: ${socket.id}  (Connected sockets: ${this._io.sockets.size})`,
    );
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    // Remove the user from all rooms it was part of
    for (const [roomId, users] of this._roomUsers.entries()) {
      const userToRemove = Array.from(users).find(
        (user) => user.socketId === socket.id,
      );
      if (userToRemove) {
        users.delete(userToRemove);
        if (users.size === 0) {
          this._roomUsers.delete(roomId);
        } else {
          const usersInRoom = Array.from(this._roomUsers.get(roomId) || []);
          this._io
            .to(roomId)
            .emit('whiteboard:leftRoom', { users: usersInRoom });
        }
      }
    }

    this._logger.log(
      `Socket disconnected: ${socket.id}  (Connected sockets: ${this._io.sockets.size})`,
    );
  }
}
