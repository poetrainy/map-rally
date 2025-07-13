import type { Map, Post } from "@/types/map";
import type { User } from "@/types/user";

export const MOCK_USERS: User[] = [
  {
    id: "user1",
    email: "user1@example.com",
    name: "おたくちゃん",
    icon: "/images/icon-user1.jpg",
    blockedUsers: [],
    likedMapIds: [],
  },
  {
    id: "user2",
    email: "user2@example.com",
    name: "無農薬人間",
    blockedUsers: [],
    likedMapIds: [],
  },
];

export const MOCK_MAPS: Map[] = [
  {
    id: "map1",
    name: "現場で訪れた会場記録 近畿編",
    region: "kinki",
    tags: ["現場", "オタク"],
    userId: "user1",
    isPin: true,
    visibility: "public",
    posts: [
      "post1",
      "post2",
      "post3",
      "post4",
      "post5",
      "post6",
      "post7",
      "post8",
      "post9",
      "post10",
    ],
  },
  {
    id: "map2",
    name: "四国の柑橘を食ってみる旅",
    region: "shikoku",
    tags: ["柑橘"],
    userId: "user2",
    isPin: false,
    visibility: "public",
    posts: ["post11", "post12", "post13", "post14"],
  },
  {
    id: "map3",
    name: "現場で訪れた会場記録 関東編",
    region: "kanto",
    tags: ["現場", "オタク"],
    userId: "user1",
    isPin: false,
    visibility: "public",
    posts: ["post15", "post16"],
  },
  {
    id: "map4",
    name: "マップ4",
    region: "shikoku",
    tags: ["柑橘"],
    userId: "user1",
    isPin: false,
    visibility: "private",
    posts: [],
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "post1",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "osaka-prefecture",
    images: ["/images/post-osaka-01.jpg"],
    place: "梅田芸術劇場 メインホール",
    title: "梅田芸術劇場 メインホール",
    text: "梅田芸術劇場 メインホールに行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post2",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "osaka-prefecture",
    images: ["/images/post-osaka-02.jpg"],
    place: "京セラドーム大阪",
    title: "京セラドーム大阪",
    text: "京セラドーム大阪に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post3",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "osaka-prefecture",
    images: ["/images/post-osaka-03.jpg"],
    place: "オリックス劇場",
    title: "オリックス劇場",
    text: "オリックス劇場に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post4",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "osaka-prefecture",
    images: ["/images/post-osaka-04.jpg"],
    place: "ホテルニューオータニ大阪「鳳凰」",
    title: "ホテルニューオータニ大阪「鳳凰」",
    text: "ホテルニューオータニ大阪「鳳凰」に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post5",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "kyoto-prefecture",
    images: ["/images/post-kyoto-01.jpg"],
    place: "平安神宮",
    title: "平安神宮",
    text: "平安神宮に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post6",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "kyoto-prefecture",
    images: ["/images/post-kyoto-01.jpg"],
    place: "平安神宮",
    title: "平安神宮",
    text: "平安神宮に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post7",
    publishedAt: "2025-01-01",
    prefecture: "kyoto-prefecture",
    mapId: "map1",
    images: ["/images/post-kyoto-02.jpg"],
    place: "ロームシアター京都",
    title: "ロームシアター京都",
    text: "ロームシアター京都に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post8",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "nara-prefecture",
    images: ["/images/post-nara-01.jpg"],
    place: "なら100年会館",
    title: "なら100年会館",
    text: "なら100年会館に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post9",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "nara-prefecture",
    images: ["/images/post-nara-01.jpg"],
    place: "なら100年会館",
    title: "なら100年会館",
    text: "なら100年会館に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post10",
    publishedAt: "2025-01-01",
    mapId: "map1",
    prefecture: "hyogo-prefecture",
    images: ["/images/post-hyogo-01.jpg"],
    place: "神戸ワールド記念ホール",
    title: "神戸ワールド記念ホール",
    text: "神戸ワールド記念ホールに行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post11",
    publishedAt: "2025-01-01",
    mapId: "map2",
    prefecture: "ehime-prefecture",
    images: ["/images/post-ehime-01.jpg"],
    place: "愛南町",
    title: "紅まどんな",
    text: "紅まどんなを食べました。とてもフレッシュで美味しかったです！",
  },
  {
    id: "post12",
    publishedAt: "2025-01-01",
    mapId: "map2",
    prefecture: "ehime-prefecture",
    images: ["/images/post-ehime-02.jpg"],
    place: "今治市",
    title: "温州みかん",
    text: "温州みかんを食べました。とてもフレッシュで美味しかったです！",
  },
  {
    id: "post13",
    publishedAt: "2025-01-01",
    mapId: "map2",
    prefecture: "tokushima-prefecture",
    images: ["/images/post-tokushima-01.jpg"],
    place: "佐那河内村",
    title: "すだち",
    text: "すだちを食べました。とてもフレッシュで美味しかったです！",
  },
  {
    id: "post14",
    publishedAt: "2025-01-01",
    mapId: "map2",
    prefecture: "kagawa-prefecture",
    images: ["/images/post-kagawa-01.jpg"],
    place: "高松市",
    title: "レモン",
    text: "レモンの入ったうどんを食べました。とてもフレッシュで美味しかったです！",
  },
  {
    id: "post15",
    publishedAt: "2025-01-01",
    mapId: "map3",
    prefecture: "tokyo",
    images: ["/images/post-tokyo-01.jpg"],
    place: "帝国劇場",
    title: "帝国劇場",
    text: "帝国劇場に行ってきました。とても広くて綺麗な会場でした！",
  },
  {
    id: "post16",
    publishedAt: "2025-01-01",
    mapId: "map3",
    prefecture: "tokyo",
    images: ["/images/post-tokyo-02.jpg"],
    place: "東京国際フォーラム",
    title: "東京国際フォーラム",
    text: "東京国際フォーラムに行ってきました。とても広くて綺麗な会場でした！",
  },
];

export const MOCK_USER_SIGN_INNED: User = MOCK_USERS[0];

export const MOCK_MAPS_USER_SIGN_INNED: Map[] = MOCK_MAPS.filter(
  ({ userId }) => userId === MOCK_USER_SIGN_INNED.id
);

export const getMap = (id: string) => MOCK_MAPS.find((map) => id === map.id);

export const getUser = (id: string) =>
  MOCK_USERS.find((user) => id === user.id);

export const getPosts = (mapId: string) =>
  MOCK_POSTS.filter((post) => mapId === post.mapId);

export const getPost = (id: string) =>
  MOCK_POSTS.find((post) => id === post.id);
