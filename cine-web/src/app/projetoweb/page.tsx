import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectWebPage() {
  const teamMembers = [
    {
      name: 'Malu de Faria Neves Bezerra',
      contribution: 'Gerente de Projeto, designer de UI/UX e desenvolvedora front-end. Responsável pela pesquisa de design, criação de protótipos e desenvolvimento da interface do usuário com React e ShadCN.',
    },
    {
      name: 'Vinicius Anderson Cavalcanti Silva',
      contribution: 'Desenvolvedor back-end. Focado na integração com a API do TMDB, configuração do servidor e gerenciamento da lógica de busca de dados.',
    },
    {
      name: 'Leandro Lima da Silva',
      contribution: 'Desenvolvedor full-stack. Trabalhou na implementação das funcionalidades de "like", "salvar" e "não gostei", além de auxiliar no front-end e back-end.',
    },
    {
      name: 'Pedro Victor Gomes de Araújo',
      contribution: 'Desenvolvedor front-end. Colaborou na estilização dos componentes, responsividade do site e na implementação da página de perfil do usuário.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-headline text-primary text-center">
        Sobre o Projeto
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Integrantes da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {teamMembers.map((member, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{member.name}</AccordionTrigger>
                <AccordionContent>{member.contribution}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções do Projeto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            A equipe deverá apresentar o projeto na aula do dia 23 ou do dia
            26/09/2025 - a equipe que não apresentar por qualquer motivo terá
            1,0 ponto de penalidade - o integrante que não participar da
            apresentação terá 0,5 ponto de penalidade.
          </p>
          <p>
            Vocês devem utilizar o tema que desejarem para implementar o site em
            React/Next com CSS e gerar um resultado profissional.
          </p>
          <p>
            O CSS pode ser implementado diretamente, ou utilizando um framework
            compatível com o React.
          </p>
          <p>
            O site deve ter interatividade e deve ter um CRUD de uma entidade
            interligada ao back-end desenvolvido com o back4app (ou qualquer
            outro back-end que você desejar).
          </p>
          <div>
            <p className="mb-2">
              Utilize também alguma outra API, como as disponibilizadas em:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>https://rapidapi.com/collection/list-of-free-apis</li>
              <li>https://github.com/public-apis/public-apis</li>
              <li>https://apilist.fun/</li>
              <li>https://public-apis.io/</li>
              <li>qualquer outra que você achar pela internet</li>
            </ul>
          </div>
          <div>
            <p className="mb-2">
              A entrega do trabalho deve ser realizada anexando:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>
                link para o seu código no github (repositório precisa ter um
                arquivo README.md com o nome de todos os integrantes da equipe)
              </li>
              <li>link para o seu site publicado no vercel</li>
              <li>
                link para o seu vídeo no YouTube de até 4 minutos navegando no
                seu site mostrando uma visão geral e realizando o CRUD de alguma
                entidade no back-end (deixe o seu vídeo no YouTube público ou não
                listado, pois se estiver privado não terei acesso) [não anexar
                diretamente o vídeo na atividade - não anexar link do vídeo para
                outros sites / onedrive / google drive / etc.]
              </li>
              <li>
                PDF com a sua apresentação (deve ter um ou mais slide detalhando
                os requisitos deste projeto)
              </li>
            </ul>
          </div>
          <p>
            <strong>OBS 1:</strong> apesar da tarefa ser em grupo, é necessário
            que TODOS realizem a entrega pelo Teams (quem não realizar a entrega
            terá 1,0 ponto de penalidade).
          </p>
          <p>
            <strong>OBS 2:</strong> será permitida entrega atrasada até a
            sexta-feira (26/09/2025) tendo 1,0 ponto de penalidade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}