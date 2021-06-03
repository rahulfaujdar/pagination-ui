import React, {useEffect, useState} from 'react';
import {Button, makeStyles, Grid} from "@material-ui/core";

interface PaginationProps {
    limit?: number,
    total: number,
    page?: number,
    pagesOnly?: boolean
    limitRange?: boolean | number[],
    onPageChange?: (page: number) => void,
    onLimitChange?: (limit: number) => void
}

interface PaginationState {
    limit: number,
    page: number,
}

const useStyles = makeStyles(() => ({
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
}))

const Pagination = (props: PaginationProps) => {
    const [state, setState] = useState<PaginationState>({
        page: 1,
        limit: 10
    });

    const [arrOfButtons, setArrOfButtons] = useState([]);

    const {total, onPageChange, onLimitChange} = props;

    const totalPages = Math.ceil(props.total / (props?.limit || state.limit));

    let limit = props.limit || state.limit;
    let rangeOfLimit;
    let page = props.page || state.page

    if (props?.limitRange === true) {
        if (!props.limit) {
            rangeOfLimit = [10];
        } else {
            rangeOfLimit = [10, 20, 30];
        }
    } else if (!props?.limitRange) {
        rangeOfLimit = null;
    } else {
        rangeOfLimit = props.limitRange;
    }

    const classes = useStyles();

    const numberOfPages: any[] = [];
    for (let i = 1; i <= totalPages; i++) {
        numberOfPages.push(i)
    }


    const changePage = (page: number) => {
        if (page > numberOfPages.length)
            page = numberOfPages.length;
        if (page < 1) {
            page = 1;
            numberOfPages.push(1);
        }
        if (page !== (props.page || state.page))
            if (!props.page) {
                setState(prev => ({
                        ...prev,
                        page
                    })
                )
            } else {
                onPageChange && onPageChange(page);
            }
    };

    useEffect(() => {
        let tempNumberOfPages: any = [...arrOfButtons];

        let dots = '...';

        if (numberOfPages.length < 7) {
            tempNumberOfPages = numberOfPages
        } else if (page >= 1 && page <= 4) {
            tempNumberOfPages = [1, 2, 3, 4, 5, dots, numberOfPages.length]
        } else if (page > 4 && page < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
            const sliced1 = numberOfPages.slice(page - 3, page)                 // sliced1 (5-3, 5) -> [3,4,5]
            const sliced2 = numberOfPages.slice(page, page + 2)                 // sliced1 (5, 5+2) -> [6,7]
            tempNumberOfPages = ([1, dots, ...sliced1, ...sliced2, dots, numberOfPages.length]) // [1, '...', 3, 4, 5, 6, 7, '...', 10]
        } else if (page > numberOfPages.length - 3) {                 // > 7
            const sliced = numberOfPages.slice(numberOfPages.length - 5)       // slice(10-5)-> [6,7,8,9,10]
            tempNumberOfPages = ([1, dots, ...sliced])
        }

        changePage(page);
        setArrOfButtons(tempNumberOfPages)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, total, limit]);

    return (
        <>
            <Grid container className={classes.container}>
                {!props.pagesOnly &&
                <Grid item xs={12} sm={4} md={2} className={classes.grid}>
                    <span className={classes.text}>Total : {total}</span>
                </Grid>
                }
                <Grid item xs={12} sm={8} md={7} className={classes.grid}>
                    <Button onClick={() => changePage(page - 1)}
                            className={`${classes.moveButton} ${page <= 1 ? classes.hide : ''}`}
                            variant={"outlined"}>Prev</Button>
                    {
                        arrOfButtons?.map((item, index) => {
                            if (!(item === "...")) {
                                return <Button onClick={() => changePage(item)}
                                               className={`${classes.pageButton} ${page === item ? classes.currentButton : ''}`}
                                               variant={"outlined"}
                                               key={index}>{item}</Button>
                            } else {
                                return <span className={classes.dotButton}>...</span>
                            }
                        })
                    }
                    <Button onClick={() => changePage(page + 1)}
                            className={`${classes.moveButton} ${page >= numberOfPages.length ? classes.hide : ''}`}
                            variant={"outlined"}>Next</Button>
                </Grid>
                {(!props.pagesOnly && rangeOfLimit) &&
                <Grid item xs={12} md={3} className={classes.grid}>
                    {rangeOfLimit?.map((item, index) => {
                        return <Button
                            onClick={() => onLimitChange && onLimitChange(item)}
                            className={`${classes.pageButton} ${limit === item ? classes.currentButton : ''}`}
                            variant={"outlined"}
                            key={index}>{item}</Button>
                    })}
                    <span className={classes.text}>per page</span>
                </Grid>
                }
            </Grid>
        </>
    )
}

export default Pagination;