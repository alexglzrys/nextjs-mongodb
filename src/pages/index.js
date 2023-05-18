import axios from "axios";
import Image from "next/image";
import React from "react";
import { Button, Container, Card, Grid } from "semantic-ui-react";

const HomePage = ({ tasks }) => {
  // Componente a renderizar si no hay tareas
  if (!tasks.length) return <Grid centered verticalAlign="middle" columns={1} style={{"min-height": "100vh"}}>
    <Grid.Row>
      <Grid.Column textAlign="center">
        <h3>No hay tareas registradas</h3>
        <Image src='https://michassi.com/assets/web//images/no_data_found.png' alt="No existen tareas" width={314} height={314} />
        <div>
          <Button primary>Registrar una tarea</Button>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>;

  // Componente a renderizar cuando existen tareas
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button color="green">Ver</Button>
              <Button color="orange">Editar</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

// Solicitar información al servidor - SEO
export const getServerSideProps = async (context) => {
  // Consultar todas las tareas en la base de datos
  // Solicitar información a la API de tareas
  const { data: tasks } = await axios.get("http://localhost:3000/api/tasks");

  // Enviar datos de las tareas a la vista mediante props
  return {
    props: {
      tasks,
    },
  };
};

export default HomePage;
