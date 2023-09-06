interface AppResponse {
  code: number;
  message: string;
  data?: any;
}
const createResponse = (
  code: number,
  message: string,
  data?: any
): AppResponse => {
  return {
    code,
    message,
    data,
  };
};

export { createResponse, AppResponse };
