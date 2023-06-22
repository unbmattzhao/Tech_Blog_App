const router = require("express").Router();

const { json } = require("express");
const { User, Comment, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });

    const postData = dbPostData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      postData,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const dbpostData = await Post.findByPk(req.params.id, {
        include: [
          { model: User },
          { model: Comment, include: [{ model: User }] },
        ],
      });

      const postidData = dbpostData.get({ plain: true });
      res.render("postid", {
        postidData,
        loggedIn: req.session.loggedIn,
        dbUserDataid: req.session.user_id,
        username: req.session.username,
        user_id: req.session.user_id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.post("/post/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const dbpostcomment = await Comment.create({
        text: req.body.postcommetData,
        commenterUsername: req.session.user_id,
        commentpost: req.params.id,
      });
      await res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const dbGetPost = await Post.findAll({
      where: {
        creatorUsername: req.session.user_id,
      },
    });

    const getPostData = dbGetPost.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      getPostData,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      creatorUsername: req.session.user_id,
      createdAt: req.body.sendDate,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/dashboard/:id", async (req, res) => {
  try {
    const projectData = await Post.destroy({
      where: {
        id: req.params.id,
        creatorUsername: req.session.user_id,
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/dashboard/:id", async (req, res) => {
  try {
    const projectData = await Post.update(
      {
        title: req.body.texttitle,
        content: req.body.textcontent,
        creatorUsername: req.session.user_id,
        createdAt: req.body.sendDate,
      },

      {
        where: {
          id: req.params.id,
          creatorUsername: req.session.user_id,
        },
      }
    );
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/post/comment/:id", async (req, res) => {
  try {
    const projectData = await Comment.destroy({
      where: {
        id: req.params.id,
        commenterUsername: req.session.user_id,
      },
    });
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.destroy();

    res.status(200).json("user deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
