import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  PopulateOptions,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(protected readonly _model: Model<TDocument>) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this._model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    populate?: PopulateOptions | PopulateOptions[],
  ): Promise<TDocument> {
    const query = this._model.findOne(filterQuery, {}, { lean: true });
    if (populate) {
      query.populate(populate);
    }
    const document = await query.exec();
    return document as TDocument;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    populate?: PopulateOptions | PopulateOptions[],
  ): Promise<TDocument[]> {
    const query = this._model.find(filterQuery, {}, { lean: true });
    if (populate) {
      query.populate(populate);
    }
    const document = await query.exec();
    return document as TDocument[];
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    populate?: PopulateOptions | PopulateOptions[],
  ) {
    const query = this._model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
    if (populate) {
      query.populate(populate);
    }
    const document = await query.exec();
    return document as TDocument;
  }
}
