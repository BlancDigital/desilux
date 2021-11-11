<?php

// Passando os dados obtidos pelo formulário para as variáveis abaixo
$nomeremetente     = $_POST['nome'];
$produto           = $_POST['produto'];
$motorizado        = $_POST['motorizado'];
$investimento      = $_POST['investimento'];
$emailremetente    = trim($_POST['email']);
$telefone      	   = $_POST['telefone'];
$emaildestinatario = 'admin@blancmarketingdigital.com.br, contato@victorh.com.br'; // Digite seu e-mail aqui, lembrando que o e-mail deve estar em seu servidor web
 
 
/* Montando a motorizado a ser enviada no corpo do e-mail. */
$motorizadoHTML = '<strong>Formulário de Contato</strong>

<p><b>Nome:</b>         '.$nomeremetente.'  </p>
<p><b>E-Mail:</b>       '.$emailremetente.' </p>
<p><b>Telefone:</b>     '.$telefone.'       </p>
<p><b>Produto:</b>      '.$produto.'        </p>
<p><b>Motorizado:</b>   '.$motorizado.'     </p>
<p><b>Investimento:</b> '.$investimento.'   </p>
<hr>';


// O remetente deve ser um e-mail do seu domínio conforme determina a RFC 822.
// O return-path deve ser ser o mesmo e-mail do remetente.
$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $emailremetente\r\n"; // remetente
$headers .= "Return-Path: $emaildestinatario \r\n"; // return-path
$envio = mail($emaildestinatario, "Lead Desilux", $motorizadoHTML, $headers); 

if($envio) {
  echo "<script>location.href='sucesso.html'</script>"; // Página que será redirecionada
 }

?>