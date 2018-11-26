const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

//Booking Type
const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        BookingId: { type: GraphQLString },
        BookingStatus: { type: GraphQLString },
        BookingType: { type: GraphQLString },
        BookingDate: { type: GraphQLString },
        SiteName: { type: GraphQLString }
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Bookings: {
            type: new GraphQLList(BookingType),
            resolve(parent, args) {
                return axios.get('http://centrenet.powerleague.com/cgi-bin/ext/WebService/Booking');
                then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});