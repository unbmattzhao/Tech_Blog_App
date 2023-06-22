document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cardToggles = Array.prototype.slice.call(
    document.querySelectorAll(".card .card-header-icon"),
    0
  );
  if (cardToggles.length > 0) {
    cardToggles.forEach((el) => {
      el.addEventListener("click", () => {
        const cardContent =
          el.parentNode.parentNode.querySelector(".card-content");
        cardContent.classList.toggle("is-hidden");
      });
    });
  }
});

$(document).ready(function () {
  $(".postcommentbutton").click(async function (event) {
    const postcommetData = $("#commentData").val();

    event.preventDefault();

    if (postcommetData) {
      const response = await fetch(`${window.location.pathname}`, {
        method: "POST",
        body: JSON.stringify({ postcommetData }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        window.location.href = `${window.location.pathname}`;
      } else {
        alert("can not post.");
      }
    }
  });
});

$(".createnewpost").click(function () {
  $(".newpostarea").removeClass("hide");
  $(".createnewpost").addClass("hide");
});

$(".newpostrequest").click(async (event) => {
  event.preventDefault();
  postContent = $("#newpostcontent").val();
  postTitle = $("#newposttitle").val();
  const sendDate = new Date();

  if (postTitle && postContent) {
    const response = await fetch("/dashboard", {
      method: "POST",
      body: JSON.stringify({ postContent, postTitle, sendDate }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    } else {
      alert("can not post.");
    }
  }
});

$(".deletepost").click(async function (event) {
  const idiwant = $(this).attr("id");

  event.preventDefault();

  const response = await fetch(`/dashboard/${idiwant}`, {
    method: "DELETE",
    body: "",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    alert("can not post.");
  }
});

$(".updatepost").click(async function (event) {
  const idiwant = $(this).closest(".container").find(".deletepost").attr("id");
  event.preventDefault();
  var texttitle = $(this).closest(".container").find("#texttitle").text();
  var textcontent = $(this).closest(".container").find("#textcontent").text();
  const sendDate = new Date();

  if (textcontent || texttitle) {
    const response = await fetch(`/dashboard/${idiwant}`, {
      method: "PUT",
      body: JSON.stringify({ textcontent, texttitle, sendDate }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    } else {
      alert("can not post.");
    }
  }
});

$(".deleteComment").click(async function (event) {
  const id = $(this).attr("id");
  event.preventDefault();
  const response = await fetch(`/post/comment/${id}`, {
    method: "DELETE",
    body: "",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    alert("can not post.");
  }
});

$(".deleteaccount").click(async function (event) {
  event.preventDefault();
  const deleteuser = $(this).attr("id");
  console.log(deleteuser);
  const response = await fetch(`/delete/${deleteuser}`, {
    method: "DELETE",
    body: "",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.href = "/login";
  } else {
    alert("can not delete.");
  }
});
