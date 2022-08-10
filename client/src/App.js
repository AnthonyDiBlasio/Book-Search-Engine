import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient} from '@apollo/client';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';


const client = new ApolloClient({
	request: operation => {
		const token = localStorage.getItem('id_token');

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		});
	},
	uri: '/graphql',
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				
						<Route exact path="/" component={SearchBooks} />
						<Route
							exact
							path="/saved"
							component={SavedBooks}
						/>
						<Route
							render={() => (
								<h1 className="display-2">
									Wrong page!
								</h1>
							)}
						/>
			
			</Router>
		</ApolloProvider>
	);
}

export default App;