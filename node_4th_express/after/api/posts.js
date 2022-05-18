import { Router } from "express";

const router = Router();



let movies = [ 
  { 
    id: 1,
    title: 'Avengers',
    writer : 1,
  },
  { 
    id: 2,
    title: 'Spider-man',
    writer : 2,
  },
  { 
    id: 3,
    title: 'Harry Potter',
    writer : 3,
  },
];

//전체 글 조회하게 만들기
router.get("/", (req, res) => {
    res.json(movies);
  });

//포스트 요청을 받았을 때, 아이디 받고 추가하게 만들기
router.post("/", (req, res) => {


  const id = req.header("X-User-Id"); 
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




//풋 요청을 받았을 떄, 아이디 받고 포스트 아이디 아이디로 변환해서 수정하게 하기
router.put("/:postId", (req, res) => {
 

  const userId = req.header("X-User-Id");
  const { postId } = req.params;
  const { title } = req.body;
  const index = movies.findIndex((post) => post.id === postId-0);  // 왜 -0을 안하면 실행이 안되는지는 모르겠는데 -0을 붙여야 실행되네요ㅠ 그래서 아래도 다 -0이 붙어있어요

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

//삭제 요청 받은거~

router.delete("/:postId", (req, res) => {

  const userId = req.header("X-User-Id");
  const { postId } = req.params;
  
  const index = movies.findIndex((post) => post.id === postId-0);

  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  if (!(movies[index].writer === userId-0)) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  movies = movies.filter((post) => post.id !== postId);
  res.json({
    data: "Successfully deleted",
  });

  });

// 특정한 부분 추출! post 부분에서 수정해서 가져옴
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
