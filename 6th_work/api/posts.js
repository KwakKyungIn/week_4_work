import { Router } from "express";
import Post from '../models/post';

const router = Router();

//전체 글 조회하게 만들기
router.get("/", async(req, res) => {

  const postDatas = await Post.findAll({  });
	res.json({
		data: postDatas,
})
  });

//포스트 요청을 받았을 때, 아이디 받고 추가하게 만들기
router.post("/", async (req, res) => {
  const id = req.header("X-User-Id"); 
  const { content } = req.body;
  await Post.create({
    content : content,
    writer : id,

  })
    const postDatas = await Post.findAll({ 
      attributes: ['id'],
      where:{
        content : content,
      }
     });

    res.json({
      data: postDatas}
      )


  // const postCount = movies.push({
  //   id: nextId++,
  //   title,
  //   writer: id,
  // });
  // return res.json({
  //   data: {
  //     post: {
  //       id: postCount,
  //     },
  //   },
  // });


  });

//풋 요청을 받았을 떄, 아이디 받고 포스트 아이디 아이디로 변환해서 수정하게 하기
router.put("/:postId", async(req, res) => {
 

  const userId = req.header("X-User-Id");
  const { postId } = req.params;
  const { content } = req.body;

  await Post.update({
    content : content,}
    ,{
      where : {
        writer : userId,
        id : postId,
      }
    });

    const postDatas = await Post.findAll({ 
      attributes: ['id'],
      where:{
        content : content,
      }
     });

    res.json({
      data: postDatas}
      )


        // const index = movies.findIndex((post) => post.id === postId-0); 

  // if (index === -1) {
  //   return res.json({
  //     error: "That post does not exist",
  //   });
  // }

  // if (!(movies[index].writer === userId-0)) {
  //   return res.json({
  //     error: "Cannot modify post",
  //   });
  // }

  // movies[index].title = title;

  // return res.json({
  //   data: {
  //     id: movies[index].id,
  //   },
  // });


  });

//삭제 요청 받은거~

router.delete("/:postId", async(req, res) => {

  const userId = req.header("X-User-Id");
  const { postId } = req.params;
  // console.log(await Post.findOne({where :{id:postId},attributes: ['id'], raw : true}))
  if(postId != await Post.findOne({where :{id:postId},attributes: ['id'], raw : true}))
   {
    return res.json({
          error: "Cannot delete post",
         });
  }

  Post.destroy({
    where : {
      writer : userId,
      id : postId,
    }
  });

    res.json({
         data: "Successfully deleted",
       });

  });

// 특정한 부분 추출! post 부분에서 수정해서 가져옴
  router.get("/:postId",async(req, res) => {
    const { postId } = req.params;
    const postDatas = await Post.findAll({ 
      where:{
        id : postId
      }
     });
    res.json({
      data: postDatas}
      )
  });

export default router;
