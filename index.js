const { appendFile } = require("fs");
const xlsx = require("xlsx");
const fs = require("fs");


const checkLibercardFile = (file) => {
  if(fs.existsSync(file)){
    const list = xlsx.readFile("./uploads/Libecard.xlsx", {cellDates:true});
    const listX = list.Sheets["pedido (7)"];
    const data = xlsx.utils.sheet_to_csv(listX);
    const mycsv_list = data.split('\n');
    const list_of_dict = []

    for (line of mycsv_list){
      const line_list = line.split(',');
      try{
        const my_dict = {
          "matricula": line_list[1],
          "nome": line_list[2],
          "valor_p_efetivar": line_list[9],
          "departamento": line_list[10],
        }
        list_of_dict.push(my_dict);
      }
      catch(error){
        continue
      }
    } 
  }
}

const checkFortesFile = (file) => {
  if(fs.existsSync(file)){
    const list = xlsx.readFile("./uploads/Fortes.xlsx", {cellDates:true});
    const listX = list.Sheets["Página1"];
    const data = xlsx.utils.sheet_to_csv(listX);
    const mycsv_list = data.split('\n');
    const list_of_dict = [];
  
    for (line of mycsv_list){
      const line_list = line.split(',');
      try{
        const my_dict = {
          "Código": line_list[0],
          "Lot": line_list[6],
        }
        list_of_dict.push(my_dict);
      }
      catch(error){
        continue
      }
    } 
    console.log(list_of_dict)
  }
}

function checkDirectoryLibecard(directory){
  if (fs.readdirSync(directory).length) {
    checkFortesFile("./uploads/Fortes.xlsx");
    checkLibercardFile("./uploads/Libecard.xlsx")
    console.log("Consulta realizada com sucesso!")
  } else {
    console.log(`O diretório '${directory}' está vazio.`);
}
    
}

checkDirectoryLibecard("./uploads")