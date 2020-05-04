export class ResponseDTO<T> {
  message: string;

  content: T;

  status: number;

  constructor(message: string, content: T, status: number) {
    this.message = message;
    this.content = content;
    this.status = status;
  }
}
