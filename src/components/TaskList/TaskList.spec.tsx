import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskList } from '.';

describe('Task list', () => {
  it('should be able to add a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new note');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Task test'
      }
    });
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Task test');

    expect(addedFirstTaskTitle).toHaveTextContent('Task test');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')

    fireEvent.change(taskInput, {
      target: {
        value: 'Hey! Random test message.'
      }
    });
    fireEvent.click(addTaskButton);

    const addedSecondTaskTitle = screen.getByText('Hey! Random test message.');

    expect(addedFirstTaskTitle).toBeInTheDocument();
    expect(addedFirstTaskTitle).toHaveTextContent('Task test');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')

    expect(addedSecondTaskTitle).toHaveTextContent('Hey! Random test message.');
    expect(addedSecondTaskTitle.parentElement).not.toHaveClass('completed')
  })

  it('should not be able to add a task with a empty title', () => {
    render(<TaskList />);

    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.click(addTaskButton);

    expect(screen.queryByTestId('task')).toHaveTextContent('Your note must be a maximum of 250 characters. To mark it as completed, check the box on the left. You can delete it by clicking the delete button on the right.');

    const taskInput = screen.getByPlaceholderText('Add new note');

    fireEvent.change(taskInput, {
      target: {
        value: 'Task test'
      }
    });
    
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Task test');

    expect(addedFirstTaskTitle).toHaveTextContent('Task test');
  })

  it('should be able to remove a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new note');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Hey! Random test message.'
      }
    });
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Your note must be a maximum of 250 characters. To mark it as completed, check the box on the left. You can delete it by clicking the delete button on the right.');
    const addedSecondTaskTitle = screen.getByText('Hey! Random test message.');

    expect(addedFirstTaskTitle).toBeInTheDocument()
    expect(addedSecondTaskTitle).toBeInTheDocument();

    const [addedFirstTaskRemoveButton] = screen.getAllByTestId('remove-task-button');

    fireEvent.click(addedFirstTaskRemoveButton);

    expect(addedFirstTaskTitle).not.toBeInTheDocument();
    expect(addedSecondTaskTitle).toBeInTheDocument();
  })

  it('should be able to check a task', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new note');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Task test'
      }
    });
    fireEvent.click(addTaskButton);

    fireEvent.change(taskInput, {
      target: {
        value: 'Hey! Random test message.'
      }
    });
    fireEvent.click(addTaskButton);

    const [addedFirstTask, addedSecondTask] = screen.getAllByTestId('task');

    if (addedFirstTask.firstChild) {
      fireEvent.click(addedFirstTask.firstChild)
    }

    expect(addedFirstTask).toBeInTheDocument();
    expect(addedFirstTask).toHaveClass('completed');

    expect(addedSecondTask).toBeInTheDocument();
    expect(addedSecondTask).not.toHaveClass('completed');
  })

  it('should display max. characters disclaimer', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new note')

    fireEvent.change(taskInput, {
      target: {
        value: 'Sit qui exercitationem sunt provident sapiente quo. Impedit ullam est et odit. Natus recusandae similique ut culpa tenetur voluptas et accusamus. Quisquam aut dicta veniam laborum rerum est esse totam. Qui quidem cumque aut vel. Mollitia sunt illum u'
      }
    });

    const disclaimer = screen.getByText('Max. 250 characters');

    expect(disclaimer).toBeInTheDocument();
  })

  it('should submit on Enter press', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new note');

    fireEvent.change(taskInput, {
      target: {
        value: 'Task test'
      }
    });

    fireEvent.keyPress(taskInput, {key: "Enter", code: 13, charCode: 13});

    const taskAdded = screen.getByText('Task test');

    expect(taskAdded).toBeInTheDocument();
  })
})
