//:::::::::Created by: Jackson Dantas:::::::://
//função principal
function ValidarImei(){
	var listaImei,qtdIMEI,array;
	qtdIMEI = document.getElementById('txtIMEI').value;
	if(qtdIMEI == ""){
		alert("Favor inserir o(s) número(s) para validação.");
	}else{
		array = qtdIMEI.trim().split('\n');
	
		listaImei = ListaImei(array);
	
		document.getElementById('resultado').innerHTML = listaImei.join('\n');
	}
}


//função monta a lista com validação dos IMEIs
function ListaImei(array){
	var arrayImei = [],arrayImei2 = [],arrayImei3 = [],soma,digito,validadeImei, retornaLista = [];
	
	for(var i = 0 ; i < array.length; i++){
		
		if(validaTamanhoImei(array[i])){
			arrayImei = desmembraImei(array[i]);
			arrayImei2 = multiplicaNumero(arrayImei);
			arrayImei3 = somaCarateresDoisDigitos(arrayImei2);
			soma = totalSoma(arrayImei3);
			digito = digitoVerificador(soma);
			validadeImei = validarDigito(digito,arrayImei);

			if(validadeImei){
				retornaLista[i] = array[i] + " Válido";
			}else{
				retornaLista[i] = array[i] + " Inválido";
			}
		}else{
			retornaLista[i] = array[i] + " IMEI fora do formato";
		}
		
	}
	
	return(retornaLista);
};

//função para validar que imei tem 15 digitos
function validaTamanhoImei(imei){
	imei = imei.trim();
	if(imei.length == 15){
		return true;
	}else{
		return false;
	}
}


//função desmembra em um array o imei
function desmembraImei(imei){
	var desmembra = imei.toString().split('');
	return desmembra;
}

//função multiplica por 2 digito sim e digito não tirando o digito(digito = 15º digito)
function multiplicaNumero(vetorImei){

	for( var i = vetorImei.length - 2 ; i >= 0; i--){
		if(i % 2 == 1){
			vetorImei[i] *= 2;
		}
	}
	return vetorImei;
}

//função soma os digitos dos numeros maiores que 9
function somaCarateresDoisDigitos(vetorImei){
	var digito1, digito2;
	
	for( var i = vetorImei.length - 2 ; i >= 0; i--){
		if(vetorImei[i] > 9){
			digito1 = vetorImei[i].toString().substr(0,1);
			digito2 = vetorImei[i].toString().substr(1,1);
			vetorImei[i] = parseInt(digito1) + parseInt(digito2);
		}
	}
	
	return vetorImei;
}

//função soma todos os digitos
function totalSoma(vetorImei){
	var soma = 0;
	for( var i = vetorImei.length - 2 ; i >= 0; i--){
		soma += parseInt(vetorImei[i]);
	}
	return soma;
}

//função gera digito para fazer verificação com o digito do Imei
function digitoVerificador(soma){
	var digitoVerificador, digitoVerificador2;
	digitoVerificador =  soma.toString().substr(1,1);
	digitoVerificador2 = 10 - parseInt(digitoVerificador);
	if(digitoVerificador2 == 10){
		digitoVerificador2 = 0;
	}
	return digitoVerificador2;
}

//função valida se o digíto gerado é igual o digíto do IMEI
function validarDigito(digito, arrayImei){
	if(arrayImei[14] == digito){
		return(true);
	}else{
		return(false);
	}
}

//função principla gerarImei
function GerarImei(){
	var array = [], quantidade;
	quantidade = document.getElementById('txtQTD').value;
	for(var i = 0 ; i < quantidade ; i++){
		array[i] = '';
		for(var e = 0 ; e < 15 ; e++){
			if(e == 0){
				array[i] += 3;
			}else if(e == 1 || e == 6 || e == 7){
				array[i] += 5;
			}else{
				array[i] += Math.floor(Math.random() * 10);
			}
		}
	}
	
	document.getElementById('txtIMEI').innerHTML = insereDigito(array).join('\n');
	document.getElementById('resultado').innerHTML = '';
	
}

//função pega numero gerado e insere o digito válido
function insereDigito(arrayNumeros){
	var arrayImei = [],arrayImei2 = [],arrayImei3 = [],soma,digito,guardaArray, retornaLista = [];
	for(var i = 0 ; i < arrayNumeros.length; i++){
		guardaArray = desmembraImei(arrayNumeros[i]);
		arrayImei = desmembraImei(arrayNumeros[i]);
		arrayImei2 = multiplicaNumero(arrayImei);
		arrayImei3 = somaCarateresDoisDigitos(arrayImei2);
		soma = totalSoma(arrayImei3);
		digito = digitoVerificador(soma);
		guardaArray[14] = digito;
		retornaLista[i] = guardaArray.join('');
	}
	
	return retornaLista;
}

function onlynumber(evt) {
   var theEvent = evt || window.event;
   var key = theEvent.keyCode || theEvent.which;
   key = String.fromCharCode( key );
   //var regex = /^[0-9.,]+$/;
   var regex = /^[0-9.]+$/;
   if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
   }
}