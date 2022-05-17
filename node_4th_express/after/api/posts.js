import { Router } from "express";

const router = Router();

let nextPostId = 4; // movies 변수에 id를 설정합니다
let nextWriterId = 4;

let movies = [ // movies 배열
  { // movies[0]
    id: 1,
    title: 'Avengers',
    writer : 1,
  },
  { // movies [1]
    id: 2,
    title: 'Spider-man',
    writer : 2,
  },
  { // movies [2]
    id: 3,
    title: 'Harry Potter',
    writer : 3,
  },
];

//posts 주소로 GET 요청을 받았을 때, 전체 글 목록을 조회하도록 한다
router.get("/", (req, res) => {
    res.json(movies);
  });

//posts 주소로 POST 요청을 받았을 때, 글을 생성하게 한다. (Done)
router.post("/", (req, res) => {
    // movies.push({
    //     id: nextPostId++, 
    //     title: req.body.title, 
    //     writer : nextWriterId++,
    //   });

    //   res.json(movies.filter(movie => movie.id === req.body.id)[0]);

  const id = req.header("X-User-Id"); // userID
  const { title } = req.body;
  const postCount = movies.push({
    id: nextId++,
    title,
    writer: id,
  });
  return res.json({
    data: {
      post: {
        id: postCount,
      },
    },
  });


  });




//posts 주소로 PUT 요청을 받았을 때, 특정 글을 수정하도록 한다 (Done)
router.put("/:postId", (req, res) => {
    // const index = movies.findIndex(movie => movie.id === req.body.postId);
    // if (index === -1) { // 해당 영화가 없을시
    //   return res.json({
    //     error: "That movie does not exist",
    //   });
    // }

    // //자신의 글인지 확인하는 부분, id 입력 받고 배열에서 id로 writer 찾고 비교
    // const indexUserId = movies.findIndex(movie => movie.id === req.body.userIdwriter);
    // let asdasd = Object.values(movies[index])
    // if (indexUserId === asdasd) { // 자신의 글이 아닐경우
    //   return res.json({
    //     error: "Cannot modify post",
    //   });
    // }
    // movies[index] = {
    //   id: req.body.id,
    //   title: req.body.title,
    //   writer : req.body.writer,
    // };
    // res.json(movies);

  const userId = req.header("X-User-Id");
  const { postId } = req.params;
  const { title } = req.body;
  const index = movies.findIndex((post) => post.id === postId-0);

  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  if (!(movies[index].writer === userId)) {
    return res.json({
      error: "Cannot modify post",
    });
  }

  movies[index].title = title;

  return res.json({
    data: {
      id: movies[index].id,
    },
  });


});


//posts 주소로 DELETE 요청을 받았을 때, 특정 글을 삭제하도록 한다.
router.delete("/:postId", (req, res) => {
  //자신의 글인지 확인하는 부분, id 입력 받고 배열에서 id로 writer 찾고 비교
  // const indexUserId = movies.findIndex(movie => movie.id === req.body.uesrId);
  // const index = movies.findIndex(movie => movie.id === req.body.postId);  
  // let asdasd = Object.values(movies[index])
  //   if (indexUserId === asdasd) { // 자신의 글이 아닐경우
  //     return res.json({
  //       error: "Cannot delete post",
  //     });
  //   }
  
  //   movies = movies.filter(movie => movie.id !== req.body.id);

  //   res.json({
  //     data : "Successfully deleted"
  //   })
  const userId = req.header("X-User-Id");
  const { postId } = req.params;
  
  const index = movies.findIndex((post) => post.id === postId-0);

  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  if (!(movies[index].writer === userId)) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  movies = movies.filter((post) => post.id !== postId);
  res.json({
    data: "Successfully deleted",
  });

  });

//특정 글 조회 (해결)
  router.get("/:postId", (req, res) => {
     const { postId } = req.params;
    const index = movies.findIndex((post) => post.id === postId-0 );

  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }
  return res.json({
    data: movies[index],
  });
  });

export default router;
