# WIP: getTattoo service

Serviço backend da aplicação getTatto

- NodeJS: 15.7.0
- Express: 4.17.1
## Recuperação de senha

**Requisitos funcionais**

- [x] O usuário deve poder recuperar sua senha informando o seu email;
- [] O usuário deve receber o email com instruções de recuperação de senha;
- [] O usuário deve poder resetar sua senha;

**Requisitos não funcionais**

- [] Utilizar o Mailtrap para testar envios em ambiente de desenvolvimento;
- [] Utilizar o Amazon SES para envios em produção;
- [] O envio de emails deve acontecer em segundo plano (background job);

**Regras de negócio**

- [] O link enviado por email para resetar a senha deve expirar em 2h;
- [] O usuário precisa confirmar a nova senha ao resetar sua senha (confirmação de senha);

## Atualização do perfil

**Requisitos funcionais**

- [] O usuário deve poder atualizar seu nome, email e senha;

**Regras de negócio**
- [] O usuário não pode alterar seu email para um email já cadastrado na plataforma;
- [] Para atualizar sua senha o usuário deve infomar a senha antiga;
- [] Para atualizar sua senha, o usuário precisa confirmar a nova senha

## Painel do prestador

**Requisitos funcionais**

- [] O usuário deve poder listar seus agendamentos de um dia específico;
- [] O prestador deve receber uma notificação sempre que houver um novo agendamento;
- [] O prestador deve poder visualizar as notificações não lidas;

**Requisitos não funcionais**
- [] Os agendamentos do prestador no dia devem ser armazenados em cache;
- [] As notificações do prestador devem ser armazenadas no MongoDB;
- [] As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de negócio**

-[] A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

## Agendamento de serviços

**Requisitos funcionais**

- [] O usuário deve poder listar todos os prestadores de serviços cadastrados;
- [] O usuário deve poder listar os dias de um mês com pelo um horário disponível do prestador selecionado;
- [] O usuário deve poder listar horários disponíveisem um dia específico do prestador
- [] O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos não funcionais**

- [] A listagem de prestadores deve ser armazenada em cache;

**Regras de negócio**

- [] Cada agendamento deve durar 1h\*;
- [] Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro horário as 8h, último as 17h);
- [] O usuário não pode agendar em um horário já ocupado;
- [] O usuário não pode agendar em um horário que já passou;
- [] O usuário não pode agendar serviços consigo mesmo;
