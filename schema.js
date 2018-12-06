require('axios-debug-log');
const axios = require('axios');

const {GraphQLBoolean, GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt } = require('graphql');



function serialize( obj ) {
    return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}


const AccountType = new GraphQLObjectType({
    name: 'AccountType',
    fields: () => ({
        AccountRef: { type: GraphQLString },
        MemberNum: { type: GraphQLString },
        AccountId: { type: GraphQLString },
        PersonId: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Email: { type: GraphQLString },
        OptIn: { type: GraphQLBoolean },
        Active: { type: GraphQLBoolean },
        Gender: { type: GraphQLString },
        Birthday: { type: GraphQLString },
        LastVisit: { type: GraphQLString },
        Expires: { type: GraphQLString },
        DiscountCode: { type: GraphQLString },
        DiscountExpires: { type: GraphQLString },
        OnlineUserId: { type: GraphQLString },
        ClubName: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        Address: { type: AddressType}, 
        Contact: { type: ContactType} 

    })
});


const AddressType = new GraphQLObjectType({
    name: 'AddressType',
    fields: () => ({
        AddressId: { type: GraphQLString },
        Line1: { type: GraphQLString },
        Line2: { type: GraphQLString },
        Line3: { type: GraphQLString },
        Line4: { type: GraphQLString },
        PostCode: { type: GraphQLString },
        IsValidated: { type: GraphQLBoolean },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        CountryName: { type: GraphQLString },
        OpeningTime: {type: OpeningTimeType}
    })
});

const BookingType = new GraphQLObjectType({
    name: 'BookingType',
    fields: () => ({
        BookingId: { type: GraphQLString },
        BookingStatus: { type: GraphQLString },
        BookingType: { type: GraphQLString },
        OriginalBooking: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        FacilityId: { type: GraphQLString },
        TimeSlotId: { type: GraphQLString },
        PersonId: { type: GraphQLString },
        AccountId: { type: GraphQLString },
        AgreementId: { type: GraphQLString },
        StaffId: { type: GraphQLString },
        LinkedBookingId: { type: GraphQLString },
        PromotionId: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        SiteName: { type: GraphQLString },
        FacilityCode: { type: GraphQLString },
        FacilityName: { type: GraphQLString },
        FacilityTypeId: { type: GraphQLString },
        ActualBooking: { type: GraphQLString },
        BookingDate: { type: GraphQLString },
        StartTime: { type: GraphQLString },
        EndTime: { type: GraphQLString },
        Duration: { type: GraphQLString },
        SlotStatus: { type: GraphQLString },
        BookingName: { type: GraphQLString },
        BaseCharge: { type: GraphQLString },
        TotalCharge: { type: GraphQLString },
        DepositRequired: { type: GraphQLString },
        DepositPaid: { type: GraphQLString },
        DepositReturned: { type: GraphQLString },
        Payment: { type: GraphQLString },
        BalanceDue: { type: GraphQLString },
        CancellationFee: { type: GraphQLString },
        PaymentDiscount: { type: GraphQLString },
        DiscountValue: { type: GraphQLString },
        DiscountCode: { type: GraphQLString },
        DiscountName: { type: GraphQLString },
        CurrencyCode: { type: GraphQLString },
        CurrencySymbol: { type: GraphQLString },
        Rental: { type: GraphQLBoolean },
        FirstBooking: { type: GraphQLBoolean }
    })
});

const ContactType = new GraphQLObjectType({
    name: 'ContactType',
    fields: () => ({
        ContactDetailId: { type: GraphQLString },
        ContactType: { type: GraphQLString },
        ContactValue: { type: GraphQLString },
        OwnerValue: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        DisplayName: {type: OpeningTimeType}
    })
});

//enquiry Type
const EnquiryType = new GraphQLObjectType({
    name: 'EnquiryType',
    fields: () => ({
        EnquiryId: { type: GraphQLString},
        SiteId: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Telephone: { type: GraphQLString },
        Email: { type: GraphQLString },
        EnquiryType: { type: GraphQLString },
        Notes: { type: GraphQLString },
        OptIn: { type: GraphQLBoolean},
        Over18: { type: GraphQLBoolean}
    })
});

//OpeningTime Type
const OpeningTimeType = new GraphQLObjectType({
    name: 'OpeningTimeType',
    fields: () => ({
        Day: { type: GraphQLString },
        Date: { type: GraphQLString },
        Open: { type: GraphQLString },
        Close: { type: GraphQLString }
    })
});

//OnlineUser Type
const OnlineUserType = new GraphQLObjectType({
    name: 'OnlineUserType',
    fields: () => ({
        OnlineUserId: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Telephone: { type: GraphQLString },
        Mobile: { type: GraphQLString },
        DoB: { type: GraphQLString },
        Gender: { type: GraphQLString },
        Address1: { type: GraphQLString },
        Address2: { type: GraphQLString },
        CityTown: { type: GraphQLString },
        County: { type: GraphQLString },
        PostCode: { type: GraphQLString },
        CountryId: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        OptIn: { type: GraphQLBoolean }
    })
});

//Site Type
const SiteType = new GraphQLObjectType({
    name: 'SiteType',
    fields: () => ({
        SiteId: { type: GraphQLString },
        SiteCode: { type: GraphQLString },
        SiteName: { type: GraphQLString },
        RegionId: { type: GraphQLString },
        RegionName: { type: GraphQLString },
        AddressId: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        Address: { type: AddressType },
        OpeningTime: { type: OpeningTimeType }
    })
});

//Booking Type
const NewEnquiryInputType = new GraphQLInputObjectType({
    name: 'NewEnquiryInput',
    fields: () => ({
        SiteId: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Telephone: { type: GraphQLString },        
        Email: { type: GraphQLString },
        EnquiryType: { type: GraphQLString },
        Notes: { type: GraphQLString }
    })
});

var MutationType = new GraphQLObjectType({
    name: 'createEnquiry',
    description: 'createenquiry',
    fields: () => ({
        createEnquiry: {
        type: EnquiryType,
        description: 'Create an enquiry.',
        args: {
        enquiry: { type: NewEnquiryInputType }
        },
        resolve: (value, { enquiry }) => {
            //console.log(enquiry);
            //console.log(enquiry.SiteId);
            //formData = getFormData(enquiry);
            //var formData = new FormData();
            //formData.append('SiteId=d851caae-6f28-8b8d-e211-015f12033cce', enquiry.SiteId);
            //formData.append('SiteId', enquiry.SiteId);
            //formData.append('FirstName', enquiry.FirstName);
            //formData.append('LastName', enquiry.LastName);
            //formData.append('Email', enquiry.Email);
            //formData.append('Telephone', enquiry.Telephone);
            //formData.append('EnquiryType', enquiry.EnquiryType);
            //formData.append('Notes', enquiry.Notes);
            //console.log(formData);
            var poster = axios({
                method: 'post',
                url: 'http://centrenet.powerleague.com/cgi-bin/ext/WebService/Enquiry',
                //data: "SiteId=d851caae-6f28-8b8d-e211-015f12033cce&FirstName=stephen&LastName=west&Email=test@test.com&Telephone=011111&EnquiryType=test&Notes=test",
                data: serialize(enquiry),
                config: {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            })

            .then(res => res.data)
            .catch(function (response) {
                //handle error
                console.log(response);
            });
            //console.log(poster);
            //return axios.post('http://centrenet.powerleague.com/cgi-bin/ext/WebService/Enquiry', {enquiry})
            // .then(res => res.data);
            return poster;
        }
        }
    }),
});


//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Account: {
            type: new GraphQLList(AccountType),
            resolve(parent, args) {
            return axios.get(`http://centrenet.powerleague.com/cgi-bin/ext/WebService/Booking/${args.AccountId}`)
            .then(res => res.data);
        }
    },
    Bookings: {
        type: new GraphQLList(BookingType),
        resolve(parent, args) {
        return axios.get('http://centrenet.powerleague.com/cgi-bin/ext/WebService/Booking')
        .then(res => res.data);
    }
},
Booking: {
    type: BookingType,
    args: {
        BookingId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(`http://centrenet.powerleague.com/cgi-bin/ext/WebService/Booking/${args.BookingId}`)
            .then(res => res.data);
        },

    }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationType
});
