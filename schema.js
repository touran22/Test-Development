require('axios-debug-log');
const axios = require('axios');

const {GraphQLBoolean, GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLFloat } = require('graphql');

const baseUrl = 'http://centrenet.powerleague.com/cgi-bin/ext/WebService';

function serialize( obj ) {
    return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}

function merge(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
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
        CountryName: { type: GraphQLString }
    })
});

const AuthTokenType = new GraphQLObjectType({
    name: 'AuthTokenType',
    fields: () => ({
        AuthToken: { type: GraphQLString },
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

const CampType = new GraphQLObjectType({
    name: 'CampType',
    fields: () => ({
        ActivityTypeId: { type: GraphQLString },
        ActivityTypeName: { type: GraphQLString },
        AnalysisRefereeFee: { type: GraphQLString },
        CampId: { type: GraphQLString },
        CampName: { type: GraphQLString },
        CampNotes: { type: GraphQLString },
        CampRegister: {type: new GraphQLList(CampRegisterType)},
        CampStatus: {type: GraphQLString},
        DateCreated: {type: GraphQLString},
        Dates: {type: new GraphQLList(CampRegistrationDateType)},
        EarlyDropOffPrice: { type: GraphQLFloat },
        EndDate: { type: GraphQLString },
        EndTime: { type: GraphQLString },
        FacilityTypeId: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        LatePickUpPrice: { type: GraphQLInt },
        MaxCapacity: { type: GraphQLInt },
        PitchCount: { type: GraphQLInt },
        RefereeFee: { type: GraphQLFloat },
        RegistrationFee: { type: GraphQLFloat },
        ShowOnline: { type: GraphQLBoolean },
        SiteId: { type: GraphQLString },
        SiteName: { type: GraphQLString },
        SponsorName: { type: GraphQLString },
        StartDate: { type: GraphQLString },
        StartTime: { type: GraphQLString }
    })
});

const CampRegisterType = new GraphQLObjectType({
    name: 'CampRegisterType',
    fields: () => ({
        Balance: { type: GraphQLFloat },
        BookingDate: { type: GraphQLString },
        BookingId: { type: GraphQLString },
        CampId: { type: GraphQLString },
        CampRegisterId: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        Email: { type: GraphQLString },
        FirstName: {type: GraphQLString},
        GoodsTotal: {type: GraphQLFloat},
        LastModified: {type: GraphQLString},
        LastName: {type: GraphQLString},
        MemberNum: {type: GraphQLString},
        OnlineRegistration: {type: GraphQLBoolean},
        Payment: {type: GraphQLFloat},
        PersonId: {type: GraphQLString},
        RegisterName: {type: GraphQLString},
        ReplacedByPersonId: {type: GraphQLString},
        ReplacementDate: {type: GraphQLString},
        SLTransactionId: {type: GraphQLString},
        Telephone: {type: GraphQLString},
        VatTotal: {type: GraphQLFloat}
    })
});

const CampRegistrationDateType = new GraphQLObjectType({
    name: 'CampRegistrationDateType',
    fields: () => ({
        Date: { type: GraphQLString },
        NumRegistered: { type: GraphQLInt }
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

const PriceType = new  GraphQLObjectType({
    name: 'PriceType',
    fields: () => ({
        FullPrice: { type: GraphQLFloat }
    })
});

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

const TimeSlotBookingType = new GraphQLObjectType({
    name: 'TimeSlotBookingType',
    fields: () => ({
        timeSlotId: { type: GraphQLString },
        memberNum: { type: GraphQLString },
        bookingType: { type: GraphQLString }
    })
});


const TransactionType = new GraphQLObjectType({
    name: 'TransactionType',
    fields: () => ({
        SLTransactionId: { type: GraphQLString },
        TransactionDate: { type: GraphQLString },
        TransactionRef: { type: GraphQLString },
        AccountRef: { type: GraphQLString },
        AccountName: { type: GraphQLString },
        GoodsTotal: { type: GraphQLFloat },
        VatTotal: { type: GraphQLFloat },
        Payments: { type: GraphQLFloat },
        Discount: { type: GraphQLString },
        Balance: { type: GraphQLFloat }
    })
});


const NewAccountInputType = new GraphQLInputObjectType({
    name: 'NewAccountInputType',
    fields: () => ({
        OnlineId: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        DoB: { type: GraphQLString },
        Email: { type: GraphQLString },
        Telephone: { type: GraphQLString },        
        Mobile: { type: GraphQLString },        
        Address1: { type: GraphQLString },        
        Address2: { type: GraphQLString },        
        CityTown: { type: GraphQLString },        
        County: { type: GraphQLString },        
        County: { type: GraphQLString },        
        PostCode: { type: GraphQLString },
        OptIn: { type: GraphQLBoolean }
    })
});

const CampPriceInputType = new GraphQLInputObjectType({
    name: 'CampPriceInputType',
    fields: () => ({
        childDetails: { type: GraphQLString },
        password: { type: GraphQLString }
    })
}); 


const NewCampBookingInputType = new GraphQLInputObjectType({
    name: 'NewCampBookingInputType',
    fields: () => ({
        memberNum: { type: GraphQLString },
        'childDetails[]': { type: GraphQLString },
        'dates[]': { type: GraphQLString },
        'earlyDates[]': { type: GraphQLString },
        'latesDates[]': { type: GraphQLString },  
    })
});

const NewCredentialsInputType = new GraphQLInputObjectType({
    name: 'NewCredentialsInputType',
    fields: () => ({
        userId: { type: GraphQLString },
        password: { type: GraphQLString }
    })
}); 

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

const NewBookingPaymentInputType = new GraphQLInputObjectType({
    name: 'NewBookingPaymentInputType',
    fields: () => ({
        bookingId: { type: GraphQLString },
        amount: { type: GraphQLString },
        paymentRef: { type: GraphQLString }
    })
});

const NewPaymentInputType = new GraphQLInputObjectType({
    name: 'NewPaymentInputType',
    fields: () => ({
        SLTransactionId: { type: GraphQLString },
        amount: { type: GraphQLString },
        paymentRef: { type: GraphQLString }
    })
});

const NewTimeSlotBookingInputType = new GraphQLInputObjectType({
    name: 'NewTimeSlotBookingInputType',
    fields: () => ({
        timeSlotId: { type: GraphQLString },
        memberNum: { type: GraphQLString },
        bookingType: { type: GraphQLString }
    })
});  

var MutationType = new GraphQLObjectType({
    name: 'mutations',
    fields: () => ({

        createEnquiry: {
        type: EnquiryType,
        description: 'Create an enquiry.',
        args: {
        enquiry: { type: NewEnquiryInputType }
        },
        resolve: (value, { enquiry }) => {

            var poster = axios({
                method: 'post',
                url: baseUrl + '/Enquiry',
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

            return poster;
        }

        },
        createAccount: {
            type: AccountType,
            description: 'Create an account.',
            args: {
                account: { type: NewAccountInputType }
            },
            resolve: (value, { account }) => {

                var poster = axios({
                    method: 'post',
                    url: baseUrl + '/Account',
                    data: serialize(account),
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

                return poster;
            }
        },
        authenticateUser: {
            type: TransactionType,
            description: 'Authenticate a user.',
            args: {
                credentials: { type: NewCredentialsInputType }
            },
            resolve: (value, { credentials }) => {

                var poster = axios({
                    method: 'get',
                    url: baseUrl + `/Authenticate/${args.credentials.userId}`,
                    data: serialize(credentials.password),
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

            return poster;
        }
        },

        deleteBooking: {
            type: BookingType,
            description: 'Delete a booking',
            args: {
                bookingId: { type: GraphQLString }
            },
            resolve: (value, { account, accountRef }) => {

                var poster = axios({
                    method: 'delete',
                    url: baseUrl + `/Booking/${args.bookingId}`,
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

            return poster;
        }
        },

        createBubbleParty: {
            type: TimeSlotBookingType,
            description: 'Create a Bubble Party',
            args: {
                timeslot: { type: NewTimeSlotBookingInputType }
            },
            resolve: (value, { timeslot }) => {

                var poster = axios({
                    method: 'post',
                    data: serialize(timeslot),
                    url: baseUrl + `/BubbleParty`,
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

            return poster;
        }
        },

        deleteBubbleParty: {
            type: GraphQLString,
            description: 'Delete a Bubble Party',
            args: {
                bookingId: { type: GraphQLString }
            },
            resolve: (value, { account, accountRef }) => {

                var poster = axios({
                    method: 'delete',
                    url: baseUrl + `/BubbleParty/${args.bookingId}`,
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

            return poster;
        }
        },

        processBubblePartyPayment: {
            type: BookingType,
            description: 'Process a Bubble Party Payment',
            args: {
                payment: { type: NewBookingPaymentInputType }
            },
            resolve: (value, { payment }) => {

                var poster = axios({
                    method: 'post',
                    data: serialize(payment),
                    url: baseUrl + `/BubbleParty/${args.payment.bookingId}/Payment`,
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

            return poster;
        }
        },

        processBookingPayment: {
            type: BookingType,
            description: 'process a booking payment',
            args: {
                payment: { type: NewBookingPaymentInputType }
            },
            resolve: (value, { payment }) => {

                var poster = axios({
                    method: 'post',
                    data: serialize(payment),
                    url: baseUrl + `/Booking/${args.payment.bookingId}/Payment`,
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

            return poster;
        }
        },

        processAccountPayment: {
            type: TransactionType,
            description: 'Process an account payment.',
            args: {
                accountRef: {type: GraphQLString },
                payment: { type: NewAccountInputType }
            },
            resolve: (value, { account, accountRef }) => {

                var poster = axios({
                    method: 'post',
                    url: baseUrl + `/Account/${args.AccountRef}/Payment`,
                    data: serialize(account),
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

            return poster;
        }
        },
        
        createCampBooking: {
            type: BookingType,
            args: {
                campId: {type: GraphQLString },
                bookingDetails: { type: NewCampBookingInputType }
            },
             resolve: (value, bookingDetails) => {

                var poster = axios({
                    method: 'post',
                    url: baseUrl + `/Camp/${args.campId}/Booking`,
                    data: serialize(bookingDetails),
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

            return poster;
        }   
        }
    })
});



//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Account: {
            type: AccountType,
            args: {
                AccountRef: {type: GraphQLString}
            },
            resolve(parent, args) {
            return axios.get(baseUrl + `/Account/${args.AccountRef}`)
        .then(res => res.data);
    }
},

AccountBookings: {
    type: new GraphQLList(BookingType),
    args: {
        AccountRef: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Booking/${args.AccountRef}`)
        .then(res => res.data);
    }
},

Booking: {
    type: BookingType,
    args: {
        bookingId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Booking/${args.bookingId}`)
        .then(res => res.data);
    },

},

BubbleParty: {
    type: BookingType,
    args: {
        bookingId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/BubbleParty/${args.bookingId}`)
        .then(res => res.data);
    },
},

Camp: {
    type: CampType,
    args: {
        campId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Camp/${args.campId}`)
        .then(res => res.data);
    },
},

Camps: {
    type: new GraphQLList(CampType),
    resolve(parent, args) {
        return axios.get(baseUrl + `/Camp/All`)
        .then(res => res.data);
    },
},


CampSuggestions: {
    type: CampType,
    args: {
        campId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Camp/${args.campId}/Suggest`)
        .then(res => res.data);
    },
},

CampPrice: {
    type: PriceType,
    args: {
        campId: {type: GraphQLString},
        childDetails: {type: GraphQLString},
        dates: {type: GraphQLString},
        earlyDates: {type: GraphQLString},
        lateDates: {type: GraphQLString}

    },   
    resolve: (value, args ) => {
        console.log(args.childDetails);

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Camp/${args.campId}/Price/`,
            params: {
                'childDetails[]': args.childDetails,
                'dates[]': args.dates
            },
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

    return poster;

}
},




Site: {
    type: SiteType,
    args: {
        siteId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Site/${args.siteId}`)
        .then(res => res.data);
    },
},

SiteCamps: {
    type: new GraphQLList(CampType),
    args: {
        siteId: {type: GraphQLString}

    },   
    resolve(parent, args) {
        return axios.get(baseUrl + `/Camp/Site/${args.siteId}`)
        .then(res => res.data);
    }
},

SiteFromName: {
    type: SiteType,
    args: {
        name: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Site/${args.name}`)
        .then(res => res.data);
    },
},

SiteBookings: {
    type: BookingType,
    args: {
        siteId: {type: GraphQLString},
        activityId: {type: GraphQLString},
        bookingDate: {type: GraphQLString},
        StartTime: {type: GraphQLString},
        accountRef: {type: GraphQLString},
        memberNum: {type: GraphQLString}


    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Site/${args.SiteId}/Booking`)
            .then(res => res.data);
        },

    },
    Sites: {
        type: new GraphQLList(SiteType),
        resolve(parent) {
            return axios.get(baseUrl + '/Site')
            .then(res => res.data);
        },

    }

    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationType
});
