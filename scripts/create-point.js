function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    //Vai buscar algo na url passada no parâmetro
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // retorno a resposta (res), que são os estados no formato de json que também é uma promisse
    .then( res => res.json() )
    // vai retornar a nova promessa
    .then( states => {

        for(state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</o ption>`    
        }

    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indeOfSelectedStage = event.target.selectedIndex
    stateInput.value = event.target.options[indeOfSelectedStage].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // limpa o campo 
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</o ption>`    
        }

        citySelect.disabled = false

    } )

}

document
   .querySelector("select[name=uf] ")
    .addEventListener("change", getCities)