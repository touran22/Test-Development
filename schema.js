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

const BookingTypeType  = new GraphQLObjectType({
    name: 'BookingTypeType',
    fields: () => ({
        BookingTypeId: { type: GraphQLString },
        BookingTypeCode: { type: GraphQLString },
        BookingTypeName: { type: GraphQLString },
        BookingDuration: { type: GraphQLInt },
        Selectable: { type: GraphQLBoolean },
        LoyaltyOptions: { type: GraphQLBoolean },
        DefaultBookingType: {type: GraphQLString},
        AvailableOnline: {type: GraphQLBoolean}
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

const ContactMethodType = new GraphQLObjectType({
    name: 'ContactMethodType',
    fields: () => ({
        ContactMethodId: { type: GraphQLString },
        ContactMethodCode: { type: GraphQLString },
        ContactMethodName: { type: GraphQLString }
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

const CountryType = new GraphQLObjectType({
    name: 'CountryType',
    fields: () => ({
        CountryId: { type: GraphQLString },
        CountryCode: { type: GraphQLString },
        CountryName: { type: GraphQLString }
    })
});

const DivisionType = new GraphQLObjectType({
    name: 'DivisionType',
    fields: () => ({
        DivisionId: { type: GraphQLString },
        DivisionName: { type: GraphQLString },
        SponsorName: { type: GraphQLString },
        NumVacancies: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        Table: {type: new GraphQLList(TableType)}
    })
});



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

const FixtureType = new GraphQLObjectType({
    name: 'FixtureType',
    fields: () => ({
        GameId: { type: GraphQLString},
        GameName: { type: GraphQLString },
        ScheduledDate: { type: GraphQLString },
        PlayedDate: { type: GraphQLString },
        GameStatus: { type: GraphQLString },
        OriginalDate: { type: GraphQLString },
        Type: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        SiteName: { type: GraphQLString },
        DivisionId: { type: GraphQLString },
        TeamId: { type: GraphQLString },
        VisitingTeamId: { type: GraphQLString },
        BookingId: { type: GraphQLString },
        FacilityId: { type: GraphQLString },
        TournamentId: { type: GraphQLString },
        DateCreated: { type: GraphQLString},
        LastModified: { type: GraphQLString},
        StartTime: { type: GraphQLString},
        FormattedTime: { type: GraphQLString},
        FormattedDate: { type: GraphQLString},
        FacilityName: { type: GraphQLString},
        DivisionName: { type: GraphQLString},
        LeagueId: { type: GraphQLString},
        LeagueName: { type: GraphQLString},
        TeamName: { type: GraphQLString},
        VisitingTeamName: { type: GraphQLString}
    })
});

const GameType = new GraphQLObjectType({
    name: 'GameType',
    fields: () => ({
        SiteName: { type: GraphQLString},
        League: { type: GraphQLString },
        Division: { type: GraphQLString },
        GameName: { type: GraphQLString },
        Referee: { type: GraphQLString },
        HomeTeam: { type: GraphQLString },
        PlayedDate: { type: GraphQLString },
        HomeScore: { type: GraphQLString },
        VisitingTeam: { type: GraphQLString},
        VisitorScore: { type: GraphQLInt},
        Type: { type: GraphQLString},
        GameId: { type: GraphQLString},
        ScheduleDate: { type: GraphQLString},
        GameStatus: { type: GraphQLString},
        OriginalDate: { type: GraphQLString},
        HomePP: { type: GraphQLString},
        VisitorPP: { type: GraphQLString},
        RefereePayment: { type: GraphQLString},
        RefereePaymentRef: { type: GraphQLString},
        ForfeitTeam: { type: GraphQLString},
        PostponeTeam: { type: GraphQLString},
        TeamConfirmed: { type: GraphQLBoolean},
        TeamConfirmedDate: { type: GraphQLString},
        VisitorConfirmedIP: { type: GraphQLString},
        VisitorConfirmedReqSent: { type: GraphQLString},
        TeamConfirmedReqSent: { type: GraphQLString},
        SiteId: { type: GraphQLString},
        DivisionId: { type: GraphQLString},
        TeamId: { type: GraphQLString},
        VisitingTeamId: { type: GraphQLString},
        BookingId: { type: GraphQLString},
        RefereeId: { type: GraphQLString},
        FacilityId: { type: GraphQLString},
        TournamentId: { type: GraphQLString},
        DateCreated: { type: GraphQLString},
        LastModified: { type: GraphQLString},
        GoalScorers: {type: new GraphQLList(CampRegisterType)}
    })
});

const ItemType = new GraphQLObjectType({
    name: 'ItemType',
    fields: () => ({
        ItemId: { type: GraphQLString},
        ItemCode: { type: GraphQLString},
        ItemName: { type: GraphQLString},
        ItemTypeName: { type: GraphQLString},
        Hire: { type: GraphQLBoolean},
        Quantity: { type: GraphQLInt},
        Price: { type: GraphQLFloat},
        Deposit: { type: GraphQLFloat},
        DiscountValue: { type: GraphQLFloat},
        UnitOfMeasure: { type: GraphQLString},
        UnitCharge: { type: GraphQLFloat},
        Notes: { type: GraphQLString},
        TakeAll: { type: GraphQLBoolean}
    })
});

const LeagueType = new GraphQLObjectType({
    name: 'LeagueType',
    fields: () => ({
        LeagueId: { type: GraphQLString},
        LeagueName: { type: GraphQLString},
        StartDate: { type: GraphQLString},
        EndDate: { type: GraphQLString},
        LeagueStatus: { type: GraphQLString},
        SponsorName: { type: GraphQLString},
        GameFee: { type: GraphQLFloat},
        RegistrationFee: { type: GraphQLFloat},
        StandByFee: { type: GraphQLFloat},
        PointsForWin: { type: GraphQLInt},
        PointsForLoss: { type: GraphQLInt},
        PointsForDraw: { type: GraphQLInt},
        PointsForForfeit: { type: GraphQLInt},
        TeamsForDivision: { type: GraphQLInt},
        NumDivisions: { type: GraphQLInt},
        NumRounds: { type: GraphQLInt},
        NumTeams: { type: GraphQLInt},
        GamesPerWeek: { type: GraphQLInt},
        SiteId: { type: GraphQLString},
        SiteName: { type: GraphQLString},
        ActivityTypeName: { type: GraphQLString},
        FacilityTypeId: { type: GraphQLString},
        DateCreated: { type: GraphQLString},
        LastModified: { type: GraphQLString},
        Divisions: {type: new GraphQLList(DivisionType)}
    })
});

const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        AccountRef: { type: GraphQLString},
        PersonId: { type: GraphQLString},
        MemberNum: { type: GraphQLString},
        FirstName: { type: GraphQLString},
        LastName: { type: GraphQLString},
        MetaphoneName: { type: GraphQLString},
        Email: { type: GraphQLString},
        Active: { type: GraphQLBoolean},
        Gender: { type: GraphQLString},
        Birthday: { type: GraphQLString},
        LastVisit: { type: GraphQLString},
        Expires: { type: GraphQLString},
        DiscountCode: { type: GraphQLString},
        DiscountExpires: { type: GraphQLString},
        OnlineUserId: { type: GraphQLString},
        ClubName: { type: GraphQLString},
        EmailNotifications: { type: GraphQLString},
        OptIn: { type: GraphQLBoolean},
        ReferredBy: { type: GraphQLString},
        SiteId: { type: GraphQLString},
        AddressId: { type: GraphQLString},
        AccountId: { type: GraphQLString},
        DateCreated: { type: GraphQLString},
        LastModified: { type: GraphQLString},
        CreatedBy: { type: GraphQLString},
        ModifiedBy: { type: GraphQLString},
        Address: {type: AddressType},
        Contact: {type: new GraphQLList(ContactType)},
    })
});


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

const PlayerType = new  GraphQLObjectType({
    name: 'PlayerType',
    fields: () => ({
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Active: { type: GraphQLBoolean },
        Contact: { type: GraphQLBoolean },
        AltContact: { type: GraphQLBoolean },
        PlayerTeam: {type: new GraphQLList(TeamType)}
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

const TableType = new  GraphQLObjectType({
    name: 'TableType',
    fields: () => ({
        TeamName: { type: GraphQLString },
        LeagueName: { type: GraphQLString },
        DivisionName: { type: GraphQLString },
        LeagueId: { type: GraphQLString },
        DivisionId: { type: GraphQLString },
        TeamId: { type: GraphQLString },
        Wins: { type: GraphQLString },
        Losses: { type: GraphQLString },
        Draws: { type: GraphQLString },
        GoalsFor: { type: GraphQLString },
        GoalsAgainst: { type: GraphQLString },
        Points: { type: GraphQLString },
        PenaltyPoints: { type: GraphQLString },
        LastModified: { type: GraphQLString }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'TeamType',
    fields: () => ({
        TeamName: { type: GraphQLString },
        SponsorName: { type: GraphQLString },
        TeamStatus: { type: GraphQLString },
        ContactName: { type: GraphQLString },
        AltContactName: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        TeamPlayer: { type: new GraphQLList(PlayerType) }
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

const TimeSlotType = new GraphQLObjectType({
    name: 'TimeSlotType',
    fields: () => ({
        TimeSlotId: { type: GraphQLString },
        BookingDate: { type: GraphQLString },
        StartTime: { type: GraphQLString },
        Duration: { type: GraphQLString },
        SlotStatus: { type: GraphQLString },
        ShowOnline: { type: GraphQLBoolean },
        Discount: { type: GraphQLFloat },
        LockedBy: { type: GraphQLString },
        LockTimeout: { type: GraphQLString },
        MadeToMove: { type: GraphQLBoolean },
        SiteId: { type: GraphQLString },
        FacilityId: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        AdhocTimeSlots: { type: GraphQLBoolean },
        EndTime: { type: GraphQLInt },
        SiteName: { type: GraphQLString },
        FacilityName: { type: GraphQLString },
        FacilityTypeId: { type: GraphQLString },
        FacilityTypeName: { type: GraphQLString },
        MinOccupancy: { type: GraphQLInt },
        MaxOccupancy: { type: GraphQLInt },
        DefaultBookingType: { type: GraphQLString },
        MultipleBookings: { type: GraphQLBoolean },
        FullPrice: { type: GraphQLFloat },
        DiscountedPrice: { type: GraphQLFloat },
        BlockBookingPrice: { type: GraphQLFloat },
        CurrencyCode: { type: GraphQLString },
        CurrencySymbol: { type: GraphQLString },
        DiscountCode: { type: GraphQLString },
        DiscountValue: { type: GraphQLString },
        BookingTypeCode: { type: GraphQLString },
        BookingTypeName: { type: GraphQLString },
        BlockAvailable: { type: GraphQLBoolean }
    })
});

const TournamentType = new GraphQLObjectType({
    name: 'TournamentType',
    fields: () => ({
        TournamentId: { type: GraphQLString },
        TournamentCode: { type: GraphQLString },
        TournamentName: { type: GraphQLString },
        SponsorName: { type: GraphQLString },
        RegistrationFee: { type: GraphQLString },
        TournamentNotes: { type: GraphQLString },
        SiteId: { type: GraphQLString },
        ActivityTypeId: { type: GraphQLString },
        DateCreated: { type: GraphQLString },
        LastModified: { type: GraphQLString },
        SiteName: { type: GraphQLString },
        ActivityTypeName: { type: GraphQLString },
        CurrencyCode: { type: GraphQLString },
        CurrencySymbol: { type: GraphQLString },
        TournamentDate: { type: GraphQLString }
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
        childDetails: { type: GraphQLString },
        dates: { type: GraphQLString },
        earlyDates: { type: GraphQLString },
        latestDates: { type: GraphQLString }  
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

const NewFunctionTimeSlotInputType = new GraphQLInputObjectType({
    name: 'NewFunctionTimeSlotInputType',
    fields: () => ({
        timeSlotId: { type: GraphQLString },
        startTime: { type: GraphQLString },
        duration: { type: GraphQLInt },
        memberNum: { type: GraphQLString },        
        activityId: { type: GraphQLString }
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

const MemberContactDetailInputType = new GraphQLInputObjectType({
    name: 'MemberContactDetailInputType',
    fields: () => ({
        ContactType: { type: GraphQLString},
        ContactValue: { type: GraphQLString}
    })
});

const MemberInputType = new GraphQLInputObjectType({
    name: 'MemberInputType',
    fields: () => ({

        FirstName: { type: GraphQLString},
        LastName: { type: GraphQLString},
        Email: { type: GraphQLString},
        Telephone: { type: GraphQLString},
        Mobile: { type: GraphQLString},
        DoB: { type: GraphQLString},
        Gender: { type: GraphQLString},
        Address1: { type: GraphQLString},
        Address2: { type: GraphQLString},
        CityTown: { type: GraphQLString},
        County: { type: GraphQLString},
        PostCode: { type: GraphQLString},
        CountryId: { type: GraphQLString},
        SiteId: { type: GraphQLString},
        OptIn: { type: GraphQLBoolean}
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
        },

        createFunction: {
            type: BookingType,
            args: {
                timeSlot: { type: NewFunctionTimeSlotInputType }
            },
            resolve: (value, bookingDetails) => {

                var poster = axios({
                    method: 'post',
                    url: baseUrl + `/Function`,
                    data: serialize(timeSlot),
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

        processFunctionPayment: {
            type: BookingType,
            description: 'process a function payment',
            args: {
                payment: { type: NewBookingPaymentInputType }
            },
            resolve: (value, { payment }) => {

                var poster = axios({
                    method: 'post',
                    data: serialize(payment),
                    url: baseUrl + `/Function/${args.payment.bookingId}/Payment`,
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

        deleteFunction: {
            type: BookingType,
            description: 'Delete a function',
            args: {
                bookingId: { type: GraphQLString }
            },
            resolve: (value, { account, accountRef }) => {

                var poster = axios({
                    method: 'delete',
                    url: baseUrl + `/Function/${args.bookingId}`,
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

        addGoalScorer: {
            type: BookingType,
            description: 'Delete a goalscorer',
            args: {
                gameId: { type: GraphQLString },
                personId: { type: GraphQLString },
                numGoals: { type: GraphQLInt }
            },
            resolve: (value, { gameId, personId, numGoals }) => {

                var poster = axios({
                    method: 'post',
                    url: baseUrl + `/GoalScorer/${args.personId}/Fixture/${args.gameId}`,
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

        bookKidsParty: {
            type: BookingType,
            description: 'Delete a goalscorer',
            args: {
                timeSlotId: { type: GraphQLString },
                accountRef: { type: GraphQLString },
                memberNum: { type: GraphQLString },
                name: { type: GraphQLString },
                numGuests: { type: GraphQLInt },
                itemId: { type: GraphQLString },
                activityId: { type: GraphQLString },
            },
            resolve: (value, { timeSlotId, accountRef, memberNum, name, numGuests, itemId, activityId }) => {

                var poster = axios({
                    method: 'post',
                    params: {
                        accountRef: args.accountRef,
                        memberNum: args.memberNum,
                        name: args.name,
                        numGuests: args.numGuests,
                        'itemId[]': args.itemId,
                        activityId: args.activityId
                    },
                    url: baseUrl + `/KidsParty/${args.timeSlotId}`,
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

        createFunction: {
            type: BookingType,
            args: {
                timeSlot: { type: NewFunctionTimeSlotInputType }
            },
            resolve: (value, bookingDetails) => {

                var poster = axios({
                    method: 'post',
                    url: baseUrl + `/Function`,
                    data: serialize(timeSlot),
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

        updateMember: {
            type: MemberType,
            description: 'update member',
            args: {
                member: { type: MemberInputType },
                onlineUserId: { type: GraphQLString }
            },
            resolve: (value, { payment }) => {

                var poster = axios({
                    method: 'put',
                    params: args.member,
                    url: baseUrl + `/Member/${args.onlineUserId}`,
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
    }),
    deleteMemberContactDetail: {
        type: MemberType,
        description: 'updateMemberContactDetail',
        args: {
            onlineUserid: { type: GraphQLString },
            contactDetailId: { type: GraphQLString }
        },
        resolve: (value, { onlineUserid, password }) => {

            var poster = axios({
                method: 'delete',
                url: baseUrl + `/Member/${args.onlineUserid}/ContactDetail/${args.contactDetailId}`,
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
    updateMemberContactDetail: {
        type: MemberType,
        description: 'updateMemberContactDetail',
        args: {
            onlineUserid: { type: GraphQLString },
            ContactDetail: { type: MemberContactDetailInputType }
        },
        resolve: (value, { onlineUserid, password }) => {

            var poster = axios({
                method: 'post',
                params: {
                    ContactType: args.ContactDetail.ContactType,
                    ContactValue: args.ContactDetail.ContactDetail
                },
                url: baseUrl + `/Member/${args.member.onlineMemberId}/ContactDetail`,
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
    updateMemberPassword: {
        type: MemberType,
        description: 'update member password',
        args: {
            onlineUserid: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve: (value, { onlineUserid, password }) => {

            var poster = axios({
                method: 'put',
                params: {
                    Password: args.password
                },
                url: baseUrl + `/Member/${args.member.onlineUserid}/Password/Update`,
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
    removeTeamPlayerProfile: {
        type: MemberType,
        description: 'removeTeamPlayer',
        args: {
            teamId: { type: GraphQLString },
            personId: { type: GraphQLString }
        },
        resolve: (value, { teamId, personId }) => {

            var poster = axios({
                method: 'delete',
                url: baseUrl + `/Player/${args.teamId}/Person/${args.personId}`,
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
    createTeamPlayerProfile: {
        type: MemberType,
        description: 'createTeamPlayer',
        args: {
            teamId: { type: GraphQLString },
            personId: { type: GraphQLString },
            mainContact: { type: GraphQLString },
            altContact: { type: GraphQLString }
        },
        resolve: (value, { teamId, personId, mainContact, altContact }) => {

            var poster = axios({
                method: 'post',
                params: {
                    MainContact: args.mainContact,
                    AltContact: args.altContact
                },
                url: baseUrl + `/Player/${args.teamId}/Person/${args.personId}`,
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
    updateTeamPlayerProfile: {
        type: MemberType,
        description: 'updateTeamPlayerProfile',
        args: {
            teamId: { type: GraphQLString },
            personId: { type: GraphQLString },
            mainContact: { type: GraphQLString },
            altContact: { type: GraphQLString }
        },
        resolve: (value, { teamId, personId, mainContact, altContact }) => {

            var poster = axios({
                method: 'post',
                params: {
                    MainContact: args.mainContact,
                    AltContact: args.altContact
                },
                url: baseUrl + `/Player/${args.teamId}/Person/${args.personId}/Update`,
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

BookingTypes: {
    type: new GraphQLList(BookingTypeType),
    resolve(parent, args) {
        return axios.get(baseUrl + `/Params/BookingTypes`)
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

ContactMethods: {
    type: new GraphQLList(ContactMethodType),
    resolve(parent, args) {
        return axios.get(baseUrl + `/Params/ContactMethods`)
        .then(res => res.data);
    },
},

Countries: {
    type: new GraphQLList(CountryType),
    resolve(parent, args) {
        return axios.get(baseUrl + `/Params/Countries`)
        .then(res => res.data);
    },
},

FixtureGoalScorers: {
    type: GameType,
    args: {
        gameId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/GoalScorer/${args.gameId}/Fixture`)
        .then(res => res.data);
    },
},

Function: {
    type: BookingType,
    args: {
        bookingId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Booking/${args.bookingId}`)
        .then(res => res.data);
    },
},

KidsPartySlotsAvailable: {
    type: new GraphQLList(TimeSlotType),
    args: {
        siteId: {type: GraphQLString},
        date: {type: GraphQLString},
        numGuests: {type: GraphQLInt}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/KidsParty`,
            params: {
            siteId: args.siteId,
            date: args.date,
            numGuests: args.numGuests
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

KidsPartyPrice: {
    type: new GraphQLList(ItemType),
    args: {
        timeSlotId: {type: GraphQLString},
        activityId: {type: GraphQLString},
        numGuests: {type: GraphQLInt}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/KidsParty/${args.timeSlotId}/Price`,
            params: {
                date: args.activityId,
                numGuests: args.numGuests
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

KidsPartyExtras: {
    type: new GraphQLList(ItemType),
    args: {
        timeSlotId: {type: GraphQLString},
        activityId: {type: GraphQLString},
        numGuests: {type: GraphQLInt}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/KidsParty/${args.timeSlotId}/Extras`,
            params: {
                date: args.activityId,
                numGuests: args.numGuests
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


League: {
    type: LeagueType,
    args: {
        leagueId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/League/${args.leagueId}`)
        .then(res => res.data);
    },
},


LeagueFixtures: {
    type: new GraphQLList(FixtureType),
    args: {
        leagueId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/League/${args.leagueId}/Results`)
        .then(res => res.data);
    },
},

LeagueResults: {
    type: new GraphQLList(FixtureType),
    args: {
        leagueId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/League/${args.leagueId}/Fixtures`)
        .then(res => res.data);
    },
},

LeagueTables: {
    type: new GraphQLList(LeagueType),
    args: {
        leagueId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/League/${args.leagueId}/Tables`)
        .then(res => res.data);
    },
},

Member: {
    type: MemberType,
    args: {
        onlineUserId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Member/${args.onlineUserId}`)
        .then(res => res.data);
    },
},

MemberBookings: {
    type: new GraphQLList(BookingType),
    args: {
        onlineUserId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Member/${args.onlineUserId}/Bookings`)
        .then(res => res.data);
    },
},

MemberAuthenticate: {
    type: BookingType,
    args: {
        Email: {type: GraphQLString},
        Password: {type: GraphQLString}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'post',
            url: baseUrl + `/Member/Authenticate`,
            params: {
            Email: args.Email,
            numGuests: args.Password
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

MemberByAccountRef: {
    type: MemberType,
    args: {
        accountRef: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Member/AccountRef/${args.accountRef}`)
        .then(res => res.data);
    },
},

PartyExtras: {
    type: new GraphQLList(ItemType),
    args: {
        timeSlotId: {type: GraphQLString},
        numGuests: {type: GraphQLInt}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Party/${args.timeSlotId}/Extras`,
            params: {
                numGuests: args.numGuests
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

PartyPrice: {
    type:  PriceType,
    args: {
        timeSlotId: {type: GraphQLString},
        numGuests: {type: GraphQLInt},
        itemId: {type: GraphQLString}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Party/${args.timeSlotId}/Price`,
            params: {
                numGuests: args.numGuests,
                'itemId[]': args.numGuests,
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




PlayerTeams: {
    type: PlayerType,
    args: {
        personId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Player/${args.personId}/Teams`)
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

},

SiteAvailableBubbleParties: {
    type: new GraphQLList(TimeSlotType),
    args: {
        siteId: {type: GraphQLString},
        alternative: {type: GraphQLString}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Site/${args.siteId}/BubbleParty`,
            params: {
                alternative: args.alternative
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

SiteActiveCamps: {
    type: new GraphQLList(CampType),
    args: {
        siteId: {type: GraphQLString},
        alternative: {type: GraphQLString}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Site/${args.siteId}/Camps`,
            params: {
                alternative: args.alternative
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

SiteAvailableFunctionSlots: {
    type: new GraphQLList(TimeSlotType),
    args: {
        siteId: {type: GraphQLString},
        alternative: {type: GraphQLString}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Site/${args.siteId}/Function`,
            params: {
                alternative: args.alternative
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

SiteAvailablePartySlots: {
    type: new GraphQLList(TimeSlotType),
    args: {
        siteId: {type: GraphQLString},
        alternative: {type: GraphQLString}
    },
    resolve: (value, args ) => {

        var poster = axios({
            method: 'get',
            url: baseUrl + `/Site/${args.siteId}/Party`,
            params: {
                alternative: args.alternative
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

SiteAvailableTimeSlots: {
    type: SiteType,
    args: {
        siteId: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Site/${args.siteId}/GetBookingSlots`)
        .then(res => res.data);
    }
},

SiteActiveTournaments: {
    type: new GraphQLList(TournamentType),
    args: {
        siteId: {type: GraphQLString},
        date: {type: GraphQLString}
    },
    resolve(parent, args) {
        return axios.get(baseUrl + `/Site/${args.siteId}/Tournaments`)
            .then(res => res.data);
        }
    },    

    Sites: {
        type: new GraphQLList(SiteType),
        resolve(parent) {
            return axios.get(baseUrl + '/Site')
            .then(res => res.data);
        },

    },

    Team: {
        type: TeamType,
        args: {
            teamId: {type: GraphQLString}
        },
        resolve(parent, args) {
            return axios.get(baseUrl + `/Player/${args.teamId}`)
            .then(res => res.data);
        },

    },

    TeamPlayer: {
        type: TeamType,
        args: {
            teamId: {type: GraphQLString},
            personId: {type: GraphQLString}
        },
        resolve(parent, args) {
            return axios.get(baseUrl + `/Player/${args.teamId}/Person/${args.personId}`)
            .then(res => res.data);
        },

    }

    }
});





module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationType
});
