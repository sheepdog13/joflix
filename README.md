# joflix

<img width="1000" alt="homepreview" src="https://github.com/sheepdog13/joflix/assets/112137282/fe7fb4f8-dd15-4b43-9ebb-dd718c841e6d">

<br>

### 배포 URL : [https://joflix-coral.vercel.app](https://joflix-coral.vercel.app/)

<br>

## 1. 사용 기술

<br>

<p>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?&style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

## 2. 기능 설명

### 1. seo

1.1 generateMetadata로 metadata 동적 생성

- 홈페이지에서 영화를 클릭하면 모달로 detail페이지가 나옴
- detail페이지가 나올때는 detail페이지의 영화를 metadata로 생성
- detail모달이 아닐때는 홈페이지에 해당하는 matadata 생성

app/page.tsx

```js
export async function generateMetadata(params: Params): Promise<Metadata> {
  const id = params.searchParams.id;
  const movie = await getMovie(id);
  const idImg = movie?.poster_path
    ? makeImagePath(movie.poster_path) || makeImagePath(movie.backdrop_path)
    : "/img/bond.webp";
  return {
    title: `${id ? movie.title : "홈페이지"}`,
    description: `${id ? movie.overview : "nexflix 클론코딩 사이트" || ""}`,
    openGraph: {
      images: `${
        id ? idImg : "https://joflix-coral.vercel.app/img/homepreview.png"
      }`,
    },
    verification: { google: "pQ1HYdIr6PZIM0nUWK8VFx_m9vvOX4LYGbZ0Uba4mbE" },
  };
}
```

<p>
<img width="300" alt="스크린샷 2024-03-25 오전 11 51 06" src="https://github.com/sheepdog13/joflix/assets/112137282/67bc811e-f05a-44a9-90cf-0da5753b64a8">
<img width="295" alt="스크린샷 2024-03-25 오전 11 51 27" src="https://github.com/sheepdog13/joflix/assets/112137282/ce644a4e-5733-4050-9c0e-8ccade8a5c40">
</p>

<br>

1.2 시멘틱 태그로 변경

[시멘틱 태그](https://github.com/sheepdog13/joflix/commit/7274aed4c97dd1c0c193e246a937dc9ff085ea3f)

1.3 sitemap.xml, robots.txt 생성

- sitemap()으로 build시 sitemap.xml 생성
- public폴더에 robots.txt 생성

```js
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://joflix-coral.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://joflix-coral.vercel.app/search",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
```

```
# public/robots.txt

User-agent: *
Allow: /


Sitemap: https://https://joflix-coral.vercel.app/sitemap.xml
```

1.4 구글 서치 콘솔 등록

- generateMetadata로 metadata 동적 생성할때 verification 옵션으로 head에 등록

```js
    verification: { google: "pQ1HYdIr6PZIM0nUWK8VFx_m9vvOX4LYGbZ0Uba4mbE" },

```

[블로그 링크 걸기](https://github.com/sheepdog13/joflix/commit/7274aed4c97dd1c0c193e246a937dc9ff085ea3f)
