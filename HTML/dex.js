const fetchPokemon = () =>{
    const pokeName = document.getElementById('pokeName');
    let pokeInput = pokeName.value;
    pokeInput = pokeInput.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) =>{
        if (res.status != "200") {
            console.log(res);
            pokeImage("error.png"),
            document.getElementById('pokeImg').classList.replace('img', 'format'),
            document.getElementById('height').innerHTML = "",
            document.getElementById('weight').innerHTML = "",
            document.getElementById('habilidad1').innerHTML = "",
            document.getElementById('habilidad2').innerHTML = "",
            document.getElementById('moves').textContent = "",
            document.getElementById('abilitie').innerHTML = "",
            document.getElementById('countMoves').innerHTML = "",
            document.getElementById('pokemonID').innerHTML = "",
            document.getElementById('pokemonNombre').innerHTML = "";
        }
        else {
            return res.json();
        };
    }).then((data) =>{
        console.log(data)     
                
        var img = data.sprites.other.dream_world.front_default; 
        if ( img == null){
            img =  data.sprites.front_default;
        }

        let ability1 = data.types[0].type.name;
        
        var ability2 = data.types[1] && data.types[1].type && data.types[1].type.name;
            if( ability2 === undefined) {
                ability2 = "";
        }

        let moves1 = Object.values(data.moves).map(pac => pac.move.name).join(', ');
        let abilities = Object.values(data.abilities).map(pacs => pacs.ability.name).join(', ');
        let moveslen = Object.keys(data.moves).length + ' moves';
        
        let hp = data.stats[0].stat.name
        let attack = data.stats[1].stat.name
        let defense = data.stats[2].stat.name
        let specialAttack = data.stats[3].stat.name
        let specialDefense = data.stats[4].stat.name
        let speed = data.stats[5].stat.name

        let hpStat = data.stats[0].base_stat
        let attackStat = data.stats[1].base_stat
        let defenseStat = data.stats[2].base_stat
        let specialAttackStat = data.stats[3].base_stat
        let specialDefenseStat = data.stats[4].base_stat
        let speedStat = data.stats[5].base_stat

        const $grafica = document.querySelector("#stats");
       
        const etiquetas = [`${hp}`.toUpperCase(), `${attack}`.toUpperCase(), `${defense}`.toUpperCase(), `${specialAttack}`.toUpperCase(), `${specialDefense}`.toUpperCase(), `${speed}`.toUpperCase()]
        
        const pokemonStats = {
            label: "Pokemon Stats",
            data: [`${hpStat}`, `${attackStat}`, `${defenseStat}`, `${specialAttackStat}`, `${specialDefenseStat}`, `${speedStat}`], 
            backgroundColor: ['rgba(34, 207, 207, 1)', 'rgba(255, 64, 105, 1)', 'rgba(5, 155, 255, 1)', 'rgba(135, 2, 29, 1)', 'rgba(15, 122, 193, 1)', 'rgba(106, 106, 114,1)'], 
            borderColor: ['rgba(34, 207, 207, 1)', 'rgba(255, 64, 105, 1)', 'rgba(5, 155, 255, 1)', 'rgba(135, 2, 29, 1)', 'rgba(15, 122, 193, 1)', 'rgba(106, 106, 114,1)'], 
            borderWidth: 1,
        };
        
        new Chart($grafica, {
            type: 'doughnut',// Tipo de gráfica
            data: {
                labels: etiquetas,
                datasets: [
                    pokemonStats,
                ],
            },   
            options: {
                legend:{
                    display:false
                },
                centerText: {
                    display: true,
                    text: "280"
                },
                plugins: {
                    datalabels: {
                      color: '#cbeef7',
                      textAlign: 'center',
                      formatter: function(value, ctx) {
                        var index = ctx.dataIndex;
                        var label = ctx.chart.data.labels[index];
                        return label + '\n' + value;
                      },
                      font: {
                          size:9,
                          family: 'Cairo',
                          style: 'bold',
                      },
                      textStrokeWidth: 2,
                      textStrokeColor: 'black',
                      textShadowBlur: 5,
                      textShadowColor: '#00000080'
                    },
                }
            },
        });

        Chart.pluginService.register({
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
          
              ctx.restore();

              var image = new Image();      
                image.src = "Mi proyecto (5).jpg";      
                imageSize = 240;
                ctx.drawImage(image, chart.chart.width / 2 - imageSize / 2, chart.chart.height / 2 - imageSize / 2, imageSize, imageSize);
                ctx.restore();
            }
          });

        document.getElementById('pokeImg').classList.replace('format', 'img'); 
        document.getElementById('pokeImg').setAttribute('src', img, "align", "center");
        
        document.getElementById('height').innerHTML = `${data.height / 10} m`;
        document.getElementById('weight').innerHTML = `${data.weight / 10} kg`;
        document.getElementById('habilidad1').innerHTML = ability1;
        document.getElementById('habilidad2').innerHTML = ability2;
        document.getElementById('moves').textContent = moves1;
        document.getElementById('abilitie').innerHTML = abilities;
        document.getElementById('countMoves').innerHTML = moveslen;
        document.getElementById('pokemonID').innerHTML = data.id;
        document.getElementById('pokemonNombre').innerHTML = data.name;
        
        var rem = ability1; 
            if(rem.includes("steel")) {
            document.getElementById("habilidad1").style.background = "#598EA2"; 
            } else if(rem.includes("water")) {
                document.getElementById("habilidad1").style.background = "#4E91D6";
            } else if(rem.includes("bug")) {
                document.getElementById("habilidad1").style.background = "#92C12A";
            } else if(rem.includes("dragon")) {
                document.getElementById("habilidad1").style.background = "#036DC3";
            } else if(rem.includes("electric")) {
                document.getElementById("habilidad1").style.background = "#F4D339";
            } else if(rem.includes("ghost")) {
                document.getElementById("habilidad1").style.background = "#5169AD";
            } else if(rem.includes("fire")) {
                document.getElementById("habilidad1").style.background = "#FE9D53";
            } else if(rem.includes("fairy")) {
                document.getElementById("habilidad1").style.background = "#EC90E7";
            } else if(rem.includes("ice")) {
                document.getElementById("habilidad1").style.background = "#74CFC0";
            } else if(rem.includes("fighting")) {
                document.getElementById("habilidad1").style.background = "#CE3E6A";
            } else if(rem.includes("normal")) {
                document.getElementById("habilidad1").style.background = "#939FA9";
            } else if(rem.includes("planta")) {
                document.getElementById("habilidad1").style.background = "#62BC5A";
            } else if(rem.includes("psychic")) {
                document.getElementById("habilidad1").style.background = "#F87279";
            } else if(rem.includes("rock")) {
                document.getElementById("habilidad1").style.background = "#C6B88C";
            } else if(rem.includes("dark")) {
                document.getElementById("habilidad1").style.background = "#5A5265";
            } else if(rem.includes("ground")) {
                document.getElementById("habilidad1").style.background = "#D97942";
            } else if(rem.includes("poison")) {
                document.getElementById("habilidad1").style.background = "#AA6AC9";
            } else if(rem.includes("flying")) {
                document.getElementById("habilidad1").style.background = "#889ECC";
            } else if(rem.includes("grass")) {
                document.getElementById("habilidad1").style.background = "#74b045";
            } else {
                document.getElementById("habilidad1").style.background = "";
            }

        var rem1 = ability2; 
            if(rem1.includes("steel")) {
            document.getElementById("habilidad2").style.background = "#598EA2"; 
            } else if(rem1.includes("water")) {
                document.getElementById("habilidad2").style.background = "#4E91D6";
            } else if(rem1.includes("bug")) {
                document.getElementById("habilidad2").style.background = "#92C12A";
            } else if(rem1.includes("dragon")) {
                document.getElementById("habilidad2").style.background = "#036DC3";
            } else if(rem1.includes("electric")) {
                document.getElementById("habilidad2").style.background = "#F4D339";
            } else if(rem1.includes("ghost")) {
                document.getElementById("habilidad2").style.background = "#5169AD";
            } else if(rem1.includes("fire")) {
                document.getElementById("habilidad2").style.background = "#FE9D53";
            } else if(rem1.includes("fairy")) {
                document.getElementById("habilidad2").style.background = "#EC90E7";
            } else if(rem1.includes("ice")) {
                document.getElementById("habilidad2").style.background = "#74CFC0";
            } else if(rem1.includes("fighting")) {
                document.getElementById("habilidad2").style.background = "#CE3E6A";
            } else if(rem1.includes("normal")) {
                document.getElementById("habilidad2").style.background = "#939FA9";
            } else if(rem1.includes("planta")) {
                document.getElementById("habilidad2").style.background = "#62BC5A";
            } else if(rem1.includes("psychic")) {
                document.getElementById("habilidad2").style.background = "#F87279";
            } else if(rem1.includes("rock")) {
                document.getElementById("habilidad2").style.background = "#C6B88C";
            } else if(rem1.includes("dark")) {
                document.getElementById("habilidad2").style.background = "#5A5265";
            } else if(rem1.includes("ground")) {
                document.getElementById("habilidad2").style.background = "#D97942";
            } else if(rem1.includes("poison")) {
                document.getElementById("habilidad2").style.background = "#AA6AC9";
            } else if(rem1.includes("flying")) {
                document.getElementById("habilidad2").style.background = "#889ECC";
            } else if(rem1.includes("grass")) {
                document.getElementById("habilidad2").style.background = "#74b045";
            } else {
                document.getElementById("habilidad2").style.background = "";
            }                 
    })
    const pokeImage = (url) => {
        const pokePhoto = document.getElementById("pokeImg");
        pokePhoto.src = url;
    }
}

function myFunction() {
    var x = document.getElementById("moves");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

