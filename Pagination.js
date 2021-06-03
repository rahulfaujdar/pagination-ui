"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function () { return ({
    container: {
        padding: "5px 10px"
    },
    moveButton: {
        padding: "0px",
        textTransform: 'unset',
        minWidth: '50px',
        lineHeight: '1.75',
        margin: '0 2px'
    },
    pageButton: {
        padding: "0px 9px",
        textTransform: 'unset',
        minWidth: '28px',
        lineHeight: '1.75',
        margin: '0 2px'
    },
    dotButton: {
        margin: '0 10px'
    },
    currentButton: {
        color: "#fff",
        backgroundColor: "#000000",
        '&:hover': {
            background: "#000000",
        },
    },
    hide: {
        display: "none"
    },
    text: {
        margin: "10px",
        fontSize: "14px"
    },
    grid: {
        margin: "10px 0"
    }
}); });
var Pagination = function (props) {
    var _a = react_1.useState({
        page: 1,
        limit: 10
    }), state = _a[0], setState = _a[1];
    var _b = react_1.useState([]), arrOfButtons = _b[0], setArrOfButtons = _b[1];
    var total = props.total, onPageChange = props.onPageChange, onLimitChange = props.onLimitChange;
    var totalPages = Math.ceil(props.total / ((props === null || props === void 0 ? void 0 : props.limit) || state.limit));
    var limit = props.limit || state.limit;
    var rangeOfLimit;
    var page = props.page || state.page;
    if ((props === null || props === void 0 ? void 0 : props.limitRange) === true) {
        if (!props.limit) {
            rangeOfLimit = [10];
        }
        else {
            rangeOfLimit = [10, 20, 30];
        }
    }
    else if (!(props === null || props === void 0 ? void 0 : props.limitRange)) {
        rangeOfLimit = null;
    }
    else {
        rangeOfLimit = props.limitRange;
    }
    var classes = useStyles();
    var numberOfPages = [];
    for (var i = 1; i <= totalPages; i++) {
        numberOfPages.push(i);
    }
    var changePage = function (page) {
        if (page > numberOfPages.length)
            page = numberOfPages.length;
        if (page < 1) {
            page = 1;
            numberOfPages.push(1);
        }
        if (page !== (props.page || state.page))
            if (!props.page) {
                setState(function (prev) { return (__assign(__assign({}, prev), { page: page })); });
            }
            else {
                onPageChange && onPageChange(page);
            }
    };
    react_1.useEffect(function () {
        var tempNumberOfPages = __spreadArray([], arrOfButtons);
        var dots = '...';
        if (numberOfPages.length < 7) {
            tempNumberOfPages = numberOfPages;
        }
        else if (page >= 1 && page <= 4) {
            tempNumberOfPages = [1, 2, 3, 4, 5, dots, numberOfPages.length];
        }
        else if (page > 4 && page < numberOfPages.length - 2) { // from 5 to 8 -> (10 - 2)
            var sliced1 = numberOfPages.slice(page - 3, page); // sliced1 (5-3, 5) -> [3,4,5]
            var sliced2 = numberOfPages.slice(page, page + 2); // sliced1 (5, 5+2) -> [6,7]
            tempNumberOfPages = (__spreadArray(__spreadArray(__spreadArray([1, dots], sliced1), sliced2), [dots, numberOfPages.length])); // [1, '...', 3, 4, 5, 6, 7, '...', 10]
        }
        else if (page > numberOfPages.length - 3) { // > 7
            var sliced = numberOfPages.slice(numberOfPages.length - 5); // slice(10-5)-> [6,7,8,9,10]
            tempNumberOfPages = (__spreadArray([1, dots], sliced));
        }
        changePage(page);
        setArrOfButtons(tempNumberOfPages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, total, limit]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Grid, { container: true, className: classes.container },
            !props.pagesOnly &&
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 4, md: 2, className: classes.grid },
                    react_1.default.createElement("span", { className: classes.text },
                        "Total : ",
                        total)),
            react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 8, md: 7, className: classes.grid },
                react_1.default.createElement(core_1.Button, { onClick: function () { return changePage(page - 1); }, className: classes.moveButton + " " + (page <= 1 ? classes.hide : ''), variant: "outlined" }, "Prev"), arrOfButtons === null || arrOfButtons === void 0 ? void 0 :
                arrOfButtons.map(function (item, index) {
                    if (!(item === "...")) {
                        return react_1.default.createElement(core_1.Button, { onClick: function () { return changePage(item); }, className: classes.pageButton + " " + (page === item ? classes.currentButton : ''), variant: "outlined", key: index }, item);
                    }
                    else {
                        return react_1.default.createElement("span", { className: classes.dotButton }, "...");
                    }
                }),
                react_1.default.createElement(core_1.Button, { onClick: function () { return changePage(page + 1); }, className: classes.moveButton + " " + (page >= numberOfPages.length ? classes.hide : ''), variant: "outlined" }, "Next")),
            (!props.pagesOnly && rangeOfLimit) &&
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, md: 3, className: classes.grid }, rangeOfLimit === null || rangeOfLimit === void 0 ? void 0 :
                    rangeOfLimit.map(function (item, index) {
                        return react_1.default.createElement(core_1.Button, { onClick: function () { return onLimitChange && onLimitChange(item); }, className: classes.pageButton + " " + (limit === item ? classes.currentButton : ''), variant: "outlined", key: index }, item);
                    }),
                    react_1.default.createElement("span", { className: classes.text }, "per page")))));
};
exports.default = Pagination;
