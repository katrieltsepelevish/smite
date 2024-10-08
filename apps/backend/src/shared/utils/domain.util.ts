export class DomainUtil {
  static getAttributes = (url: string) => {
    // Check if the URL contains 'localhost'
    if (url.includes('localhost')) {
      return {
        domain: 'localhost',
        secure: false,
      };
    }

    // Extract the domain from the URL
    const hostname = new URL(url).hostname;
    const domain = `.${hostname.split('.').slice(-2).join('.')}`;

    return {
      domain,
      secure: true,
    };
  };
}
