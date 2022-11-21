export const avatarUrlGenerator = (url: string | null) => {
  if (url) {
    return `https://ya-praktikum.tech/api/v2/resources${url}`;
  }
  return 'https://avatars.mds.yandex.net/i?id=2d9d96cf73506a0498ed3ae4f5d2da5f-4779391-images-thumbs&ref=rim&n=33&w=150&h=150';
};
