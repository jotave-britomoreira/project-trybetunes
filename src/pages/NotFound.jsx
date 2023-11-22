import { Component } from 'react';
import Header from '../components/Header';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        NotFound
        <Header />
      </div>
    );
  }
}
