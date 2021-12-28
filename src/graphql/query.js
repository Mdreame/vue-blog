import { gql } from "graphql-tag";

const getBlogList = gql`
	query getBookList($name: String) {
		getBookList(name: $name) {
			name
			author {
				name
				books
			}
		}
	}
`;
export default getBlogList;
