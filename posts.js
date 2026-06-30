<!-- INSERTED HEADER -->
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Интерактив — Моя страничка</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="style.css">

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Интерактив — Моя страничка</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="style.css">

<style>
.posts-toolbar{
  display:flex; gap:8px; flex-wrap:wrap;
  justify-content:center; margin:16px 0 24px;
}
.posts-toolbar button{
  background:#1c1c1c; color:#ddd; border:1px solid #333;
  padding:6px 14px; border-radius:20px; cursor:pointer;
  font-size:14px; transition:.2s;
}
.posts-toolbar button:hover{ background:#2a2a2a; }
.posts-toolbar button.active{ background:#4a4af0; color:#fff; border-color:#4a4af0; }

.posts-count{ text-align:center; opacity:.7; margin-bottom:8px; }

.post-card{
  max-width:640px; margin:0 auto 18px; padding:16px 20px;
  background:#161616; border:1px solid #2a2a2a; border-radius:14px;
}
.post-card h3{ margin:0 0 6px; }
.post-meta{ font-size:12px; opacity:.6; margin-bottom:10px; }
.post-tag{
  display:inline-block; font-size:11px; padding:2px 8px;
  border-radius:10px; background:#2b2b40; color:#9fa8ff;
  margin-bottom:8px;
}
.post-body{ font-size:15px; line-height:1.5; white-space:pre-wrap; }
.post-image{ width:100%; border-radius:10px; margin:10px 0; }
.post-empty{ text-align:center; opacity:.6; margin-top:30px; }
</style>
</head>

<body>

<div class="topbar">
  <div class="wrapper">
    <nav class="topbar-nav">
      <a href="index.html">главная</a>
      <a href="gallery.html">галерея</a>
      <a href="projects.html">проекты</a>
      <a href="posts.html" class="on">интерактив</a>
    </nav>
  </div>
</div>

<div class="wrapper page-title">
  <h1>Интерактив</h1>
  <p class="gallery-subtitle">Оно <span class="shimmer-text">РАБОТАЕТ</span></p>
</div>

<div class="posts-toolbar" id="postsToolbar"></div>
<div class="posts-count" id="postsCount"></div>
<div id="postsFeed"></div>

<script>
const POSTS = [
  {
    title: "Новая вкладка",
    date: "2026-06-29",
    tag: "новость",
    body: "Добавлена вкладка интерактив"
  },
  {
    title: "Оао",
    date: "2026-06-29",
    tag: "мысль",
    body: "ОНО РАБОТАЕТ!"
  },
  {
    title: "Проверка фото",
    date: "2026-06-30",
    tag: "тест",
    body: "Тест изображения",
    image: "шерри.jpg"
  }
];

const TAGS = ["все", ...new Set(POSTS.map(p => p.tag).filter(Boolean))];
let activeTag = "все";

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU",{day:"2-digit",month:"long",year:"numeric"});
}

function renderToolbar(){
  const el = document.getElementById("postsToolbar");
  el.innerHTML = "";
  TAGS.forEach(tag=>{
    const btn = document.createElement("button");
    btn.textContent = tag;
    if(tag===activeTag) btn.classList.add("active");
    btn.onclick=()=>{activeTag=tag;render();};
    el.appendChild(btn);
  });
}

function render(){
  renderToolbar();

  const list = activeTag==="все"
    ? POSTS
    : POSTS.filter(p=>p.tag===activeTag);

  document.getElementById("postsCount").textContent =
    `Постов: ${list.length}`;

  const feed = document.getElementById("postsFeed");

  if(!list.length){
    feed.innerHTML = '<div class="post-empty">Пусто</div>';
    return;
  }

  feed.innerHTML = list
    .slice()
    .sort((a,b)=>new Date(b.date)-new Date(a.date))
    .map(p=>`
      <div class="post-card">
        ${p.tag ? `<span class="post-tag">${p.tag}</span>` : ""}
        <h3>${p.title}</h3>
        <div class="post-meta">${formatDate(p.date)}</div>
        ${p.image ? `<img class="post-image" src="${p.image}">` : ""}
        <div class="post-body">${p.body}</div>
      </div>
    `).join("");
}

render();
</script>

</body>
</html>
