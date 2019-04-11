import React, { Component } from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form/';

import './app.css';

export default class App extends Component {

	maxId = 1;
	state = {
		todoData: [
			this.createTodoItem('Drink coffee'),
			this.createTodoItem('Drink vodka'),
			this.createTodoItem('Make react app'),
		],
		searchText: '',
		filter: 'all' //active, all or done
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);

			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			];

			return {
				todoData: newArray
			}
		});
	};

	createTodoItem(label) {
		return {
			label,
			done: false,
			important: false,
			id: this.maxId++
		}
	}

	addItem = (text) => {
		this.setState(({ todoData }) => {
			const newItem = this.createTodoItem(text);
			return {
				todoData: [...todoData, newItem]
			}
		});
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = {...arr[idx], [propName]: !oldItem[propName]};

		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)
		];
	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};

	onSearchChange = (searchText) => {
		this.setState({
			searchText
		})
	}

	onFilterChange = (filter) => {
		this.setState({
			filter
		})
	}

	search(items, text) {
		if ( text.length === 0 ) {
			return items;
		} else {
			return items.filter((el) => el.label.toLowerCase().includes(text.toLowerCase()))
		}
	}

	filter(items, filter) {
		switch (filter) {
			case 'active':
				return items.filter((el) => !el.done);
				break;
			case 'all':
				return items;
				break;
			case 'done':
				return items.filter((el) => el.done);
				break;
			default:
				return items;
		}
	}

	render() {
		const { todoData, searchText, filter } = this.state;
		
		const visibleItems = this.filter(this.search(todoData, searchText), filter);

		const doneCount = todoData
											.filter(el => el.done === true)
											.length;
		const todoCount = todoData.length - doneCount;
		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange} />
					<ItemStatusFilter onFilterChange={this.onFilterChange} />
				</div>

				<TodoList todos={ visibleItems }
					onDeleted={ this.deleteItem }
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone} />

				<ItemAddForm
					onItemAdded={ this.addItem }/>
			</div>
		);
	}
};
