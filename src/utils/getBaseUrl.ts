export const getAbsoluteUrl = (url: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}${url}`;
};
