const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    }
}

export default a11yProps