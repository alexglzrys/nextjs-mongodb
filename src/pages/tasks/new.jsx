import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Grid } from "semantic-ui-react";

/**
 * Este componente de Página
 * Se reutiliza en la página de actualización
 * 
 * Es por ello que internamente está atento a la exisrtencia del rotuer.query.id
 * ya que si existe, se trata de una actualización
 * http://locahost:3000/tasks/:id/edit
 * 
 * Si no existe, se trata de un registro
 * http://localhost:3000/tasks
 */

const NewTaskPage = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({})
  const router = useRouter();

  const {id} = router.query
  
  // Efecto secundario para localizar infomación de la tarea a actyalizar
  useEffect(() => {
    (async( ) => {
      try {
        // Si existe un parametro de consulta en la URL, este formulario se muestra desde una página de edición 
        if (id) {
          const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
          if (response.status == 200) {
            setNewTask(response.data);
          } else {
            throw new Error(response.statusText)
          }
        }
      } catch (error) {
        router.push('/')
      }
    })();
  }, [id, router]);

  // Función de validación de campos de formulario básica
  const validate = () => {
    const my_errors = {}
    if (!newTask.title) my_errors.title = 'El titulo es requerido';
    if (!newTask.description) my_errors.description = 'La descripción es requerida'
    return my_errors; 
  }

  const hanldeChange = ({ target: { name, value } }) => {
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        // Validar y en caso de error, establecer información en el estado
        const my_errors = validate();
        if (Object.keys(my_errors).length) {
            setErrors(my_errors);
            return;
        }
        setErrors({})
        if (id) {
          // Actualizar tarea en base de datos
          await updateTask()
        } else {
          // Registrar tarea en base de datos
          await saveTask();
        }
       
    } catch (err) {
        toast.error(err.response.data)
    }
  };

  const saveTask = async() => {
    const {data} = await axios.post('/api/tasks', newTask);
    toast.success('Tarea registrada en el sistema')
    router.push('/');
  }

  const updateTask = async() => {
    const {data} = await axios.put(`/api/tasks/${id}`, newTask);
    toast.success('Tarea actualiza correctamente en el sistema')
    router.push('/');
  }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column>
          <h3>{id ? 'Editar Tarea ' : 'Registrar Nueva Tarea'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Titulo"
              name="title"
              placeholder="Titulo de la tarea"
              onChange={hanldeChange}
              value={newTask.title}
              error={errors.title ? {content: errors.title} : null}
            />
            <Form.TextArea
              label="Descripción"
              name="description"
              placeholder="Descripción detallada de la tarea"
              onChange={hanldeChange}
              value={newTask.description}
              error={errors.description ? {content: errors.description} : null}
            />
            <Button primary>{id ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NewTaskPage;
