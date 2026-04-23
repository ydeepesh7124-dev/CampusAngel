const apiKey = "AIzaSyCMkU0wS8FMPhYXnDmFB1NX7aKFD_ZLdMs";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
.then(res => res.json())
.then(data => {
  const models = data.models.map(m => m.name);
  console.log(models);
})
.catch(err => console.error(err));
