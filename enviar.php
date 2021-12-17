<?php

// Passando os dados obtidos pelo formulário para as variáveis abaixo e sanitizando
$emailremetente          = 'no-reply@blancmarketingdigital.com.br';
$nome                    = htmlspecialchars($_POST['nome-form'], ENT_QUOTES);
$telefone      	         = htmlspecialchars($_POST['cellphone-form'], ENT_QUOTES);
$email                   = htmlspecialchars($_POST['email-form'], ENT_QUOTES);
$produto                 = htmlspecialchars($_POST['produto-form'], ENT_QUOTES);
$motorizado              = htmlspecialchars($_POST['motorizado-form'], ENT_QUOTES);
$investimento            = htmlspecialchars($_POST['investimento-form'], ENT_QUOTES);
$url                     = htmlspecialchars($_POST['url-form'], ENT_QUOTES);
// $emailatt_cliente        = 'rafael.romaa@hotmail.com, contato@desiluxcortinas.com.br, desilux@terra.com.br';
$emailatt_leads          = 'leads@blancmarketingdigital.com.br';

/* =-=-=-= Informações base do e-mail (enviada para todos os destinatários) =-=-=-=*/
$corpoHTML = '<strong>Formulário de Contato</strong>

<p><b>Nome:</b>                     '.$nome.'           </p>
<p><b>E-Mail:</b>                   '.$email.'          </p>
<p><b>Produto:</b>                  '.$produto.'        </p>
<p><b>Telefone:</b>                 '.$telefone.'       </p>
<p><b>Motorizado:</b>               '.$motorizado.'     </p>
<p><b>Investimento:</b>             '.$investimento.'   </p>
<hr>';

// O remetente deve ser um e-mail do seu domínio conforme determina a RFC 822.
// O return-path deve ser ser o mesmo e-mail do remetente.
$headers  = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $emailremetente\r\n"; // remetente
/* =-=-=-= Fim das informações base do e-mail =-=-=-= */


// Envio para o e-mail do cliente
$header_cliente = $headers . "Return-Path: $emailatt_cliente \r\n";
$envio_cliente  = mail($emailatt_cliente,"[Lead] Desilux", $corpoHTML, $header_cliente);

// Envio para o e-mail de leads
$corpoHTML_leads = $corpoHTML . '<p><b> URL do Lead: </b>' .$url.' </p> <hr>';

$header_leads    = $headers . "Return-Path: $emailatt_leads \r\n";
$envio_leads     = mail($emailatt_leads,"[Lead] Desilux", $corpoHTML_leads, $header_leads); 


if($envio_cliente && $envio_leads) {
  echo "<script>location.href='sucesso.html'</script>"; // Página que será redirecionada
}

?>

