import { Router } from "express";

const router = Router();

let nextId = 4; // movies 변수에 id를 설정합니다

let movies = [ // movies 배열
  { // movies[0]
    id: 1,
    title: 'Avengers',
  },
  { // movies [1]
    id: 2,
    title: 'Spider-man',
  },
  { // movies [2]
    id: 3,
    title: 'Harry Potter',
  },
];

router.get("/", (req, res) => {
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { 
    return res.json({
      error: "Post not exist",
    });
  }
  res.json(movies.filter(movie => movie.id === req.body.id)[0]);
});

// router.get("/", (req, res) => {
//   //request의 body 안 text를 text라는 변수에 할당
//   const text = req.body.text;

//   // response code 200번과 함께 json 형태(아래의 data)를 응답
//   return res.status(200).json({
//     data: {
//       message: "POST",
//       text,
//     },
//   });
// });

export default router;
