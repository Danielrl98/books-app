import { HttpClient } from "@/shared/libs";

export class GutembergApi {
  private url = "https://gutendex.com";
  private http = new HttpClient();

  async getListBooks(page = 1) {
    const { body } = await this.http.request({
      url: `${this.url}/books/?languages=pt&page=${page}`,
      method: "get",
    });

    return body;
  }

  async getBook(book: string) {
    const { body } = await this.http.request({
      url: `${this.url}/books/?languages=pt&search=${book}`,
      method: "get",
    });

    return body;
  }

  async getPageText(url: string, page: 1) {
    const { body } = await this.http.request({
      url,
      method: "get",
    });

    const pageLength = 1000;
    const start = (page - 1) * pageLength;
    const end = page * pageLength;

    const textResult = body.slice(start, end);

    return textResult;
  }
}
