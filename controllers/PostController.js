import PostModel from "../models/post.js"

export const create = async (req, res) => {
   try {
      const doc = new PostModel({
         title: req.body.title,
         text: req.body.text,
         imageUrl: req.body.imageUrl,
         tags: req.body.tags,
         user: req.userId,
      });

      const post = await doc.save();

      res.json(post);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'не удалось создать статью'
      });
   }
}

export const update = async (req, res) => {
   try {
      const postId = req.params.id;
      await PostModel.updateOne(
         {
            _id: postId,
         },
         {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
         }
      );
      res.json({
         success: true,
      })

   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'не удалось обновить статьи'
      });
   }
}

export const remove = async (req, res) => {
   try {
      const postId = req.params.id;

      PostModel.findOneAndDelete(
         {
            _id: postId,
         }
      )
      .then((doc) => {
         res.json({
            success: true,
         })
       })
       .catch((err) => {
         console.log(err);
         res.status(404).json({ message: 'Не удалось удалить статью' });
       });

   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'не удалось удалить статью'
      });
   }
}

export const getOne = async (req, res) => {
   try {
      const postId = req.params.id;

      PostModel.findOneAndUpdate(
         {
           _id: postId,
         },
         {
           $inc: { viewsCount: 1 },
         },
         {
           returnDocument: 'after',
         }
       )
         .then((doc) => {
           res.json(doc);
         })
         .catch((err) => {
           console.log(err);
           res.status(404).json({ message: 'Статья не найдена' });
         });

   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'не удалось получить статьи'
      });
   }
}

export const getAll = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec();
      
      res.json(posts);
   } catch (err) {
      console.log(err);
      res.status(400).json({
         message: 'не удалось получить статьи'
      });
   }
}