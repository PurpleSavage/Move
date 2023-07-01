const $go=document.querySelector(".go")
const search=document.querySelector(".search_move"),
$title=document.querySelector(".title")
$plot=document.querySelector(".plot")
$director=document.querySelector(".director")
$genre=document.querySelector(".genre")
$writers=document.querySelector(".writers")
$actors=document.querySelector(".actors")
$year=document.querySelector(".year")
$runtime=document.querySelector(".runtime")
$rated=document.querySelector(".rated")
$country=document.querySelector(".country");
$awards=document.querySelector(".awards")
$poster=document.querySelector(".poster")
$typer=document.querySelector(".type")
$textInternet=document.querySelector(".text_value_internet"),
$textRotten=document.querySelector(".text_value_rotten"),
$textMetacritic=document.querySelector(".text_value_metacritics")
animation=document.querySelector(".animation");

const $internet = document.getElementById("percentage_Internet"),
$percentageRotten=document.getElementById("percentage_rotten"),
$percentageMetacritics=document.getElementById("percentage_metacritics");
$valueInternet=document.getElementById("value_percentage_internet")
$valueRotten=document.getElementById("value_percentage_rotten")
$valueMetacritic=document.getElementById("value_percentage_metacritic")
function  assignNames([title,plot,director,genre,writers,actors,year,runtime,rated,country,awards,type]){
    $title.innerText=`${title}`
    $plot.innerText=`${plot}`
    $director.innerText=`Director: ${director}`
    $genre.innerText=`Genre: ${genre}`
    $writers.innerText=`Writer: ${writers}`
    $actors.innerText=`Actors: ${actors}`
    $year.innerText=`Year: ${year}`
    $runtime.innerText=`Runtime: ${runtime}`
    $rated.innerText=`Rated: ${rated}`
    $country.innerText=`Country: ${country}`
    $awards.innerText=`Awards: ${awards}`
    $typer.innerText=`Type: ${type}`
}
function assignImage(urlImage){
    $poster.src=urlImage
}
function assignPercentage([movieDatabase='0/1',rottenData='N/A',metacriticData='0/1']){
  $textInternet.innerText=movieDatabase
  const partsMovieData =  movieDatabase.split("/");
  const numeratorMovieData = parseInt(partsMovieData[0]);
  const denominatorMovieData = parseInt(partsMovieData[1]);
  const percentageMovieData = ((numeratorMovieData / denominatorMovieData) * 100).toFixed(2);
  $internet.style.setProperty('--porcentaje',percentageMovieData+"%")
  $valueInternet.innerText=`${percentageMovieData}%`
  
  $textRotten.innerText=rottenData
  $percentageRotten.style.setProperty('--porcentaje',rottenData+"%")
  $valueRotten.innerText=rottenData

  $textMetacritic.innerText=metacriticData
  const partsMetaCritic = metacriticData.split("/")
  console.log(partsMetaCritic)
  const numeratorMetacriticData = parseInt(partsMetaCritic[0]);
  const denominatorMetacriticData = parseInt(partsMetaCritic[1]);
  const percentageMetacriticData = ((numeratorMetacriticData/ denominatorMetacriticData) * 100).toFixed(2);
  console.log(percentageMetacriticData)
  $percentageMetacritics.style.setProperty('--porcentaje',percentageMetacriticData+"%")
  $valueMetacritic.innerText=`${percentageMetacriticData}%`
  animation.classList.toggle("active")
}
function searchMove(nameMove) {
    fetch(`http://www.omdbapi.com/?t=${nameMove}&apikey={YOUR_API}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "False") { // Verificar si la respuesta es "False"
          console.error('Error:', data.Error);
          $poster.src = './img/snake.png';
          const errorMessage = data.Error;
          $type.innerText = errorMessage;
          $type.style.color = "#B31312";
        } else {
          assignNames([
            data.Title, data.Plot, data.Director, data.Genre,
            data.Writer, data.Actors, data.Year, data.Runtime, data.Rated,
            data.Country, data.Awards, data.Type
          ]);
          assignImage(data.Poster);
          const lista =[]
          data.Ratings.forEach(element=>{
            
            lista.push(element['Value'])
          })
          assignPercentage(lista)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        $poster.src = './img/snake.png';
        const errorMessage = "Error, Snaker cannot find the movie";
        $type.innerText = errorMessage;
        $type.style.color = "#B31312";
      });
  }

$go.addEventListener("click",()=>{
    searchMove(search.value)
    search.value=""
})