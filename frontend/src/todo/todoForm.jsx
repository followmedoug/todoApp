import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { changeDescription, search, add, clear } from './todoActions';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
  }

  componentWillMount(description = '') {
    this.props.search(description);
  }

  keyHandler(e) {
    const { add, search, description, clear } = this.props;

    if (e.key === 'Enter') {
      e.shiftkey ? search(description) : add(description);
    } else if (e.key === 'Escape') {
      clear();
    }
  }

  render() {
    const { add, search, description, clear } = this.props;

    return (
      <div role="form" className="todoForm">
        <Grid cols='12 9 10'>
          <input
            placeholder="Digite uma tarefa"
            className="form-control"
            onChange={this.props.changeDescription}
            value={this.props.description}
            onKeyUp={this.keyHandler}
            id="description" />
        </Grid>

        <Grid cols="12 3 2">
          <IconButton style='primary' icon='plus' onClick={() => add(description)} />
          <IconButton style='info' icon='search' onClick={() => search(description)} />
          <IconButton style='default' icon='close' onClick={this.props.clear} />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({ description: state.todo.description });
const mapDispatchToprops = dispatch =>
  bindActionCreators({ changeDescription, search, add, clear }, dispatch)
export default connect(mapStateToProps, mapDispatchToprops)(TodoForm)