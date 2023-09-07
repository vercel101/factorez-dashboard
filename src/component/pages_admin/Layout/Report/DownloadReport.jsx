import React from "react";
import { Button, Card, CardBody, CardHeader, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { PiExportLight, PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { exportPurchaseReport, exportSaleReport } from "../../../../apis/adminApis";

const DownloadReport = ({ tokenReducer, userInfoReducer }) => {
    const toast = useToast();
    const [saleDate, setSaleDate] = React.useState({
        startDate: "",
        endDate: "",
    });
    const [purchaseDate, setPurchaseDate] = React.useState({
        startDate: "",
        endDate: "",
    });

    const saleExport = async () => {
        if (saleDate.startDate && saleDate.endDate) {
            let date1 = new Date(saleDate.startDate).getTime();
            let date2 = new Date(saleDate.endDate).getTime();
            if (date1 <= date2) {
                let data = { startDate: saleDate.startDate, endDate: saleDate.endDate };
                await exportSaleReport(data, tokenReducer)
                    .then((res) => {
                        console.log(res.data);
                        let blob = res.data;
                        const url = window.URL.createObjectURL(new Blob([blob]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", `Exported.xlsx`);

                        // Append to html link element page
                        document.body.appendChild(link);

                        // Start download
                        link.click();

                        // Clean up and remove the link
                        link.parentNode.removeChild(link);
                        toast({
                            title: "Success",
                            status: "success",
                            description: "res.data.message",
                            isClosable: true,
                            position: "top",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        toast({
                            title: "Error",
                            status: "error",
                            description: err.message,
                            isClosable: true,
                            position: "top",
                        });
                    });
            } else {
                toast({
                    title: "Warning",
                    status: "warning",
                    description: "Wrong date range",
                    isClosable: true,
                    position: "top",
                });
            }
        } else {
            toast({
                title: "Warning",
                status: "warning",
                description: "Start and end date is required",
                isClosable: true,
                position: "top",
            });
        }
    };

    const purchaseExport = async () => {
        if (purchaseDate.startDate && purchaseDate.endDate) {
            let date1 = new Date(purchaseDate.startDate).getTime();
            let date2 = new Date(purchaseDate.endDate).getTime();
            if (date1 <= date2) {
                let data = { startDate: purchaseDate.startDate, endDate: purchaseDate.endDate };
                await exportPurchaseReport(data, tokenReducer)
                    .then((res) => {
                        console.log(res.data);

                        let blob = res.data;
                        const url = window.URL.createObjectURL(new Blob([blob]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", `Exported.xlsx`);

                        // Append to html link element page
                        document.body.appendChild(link);

                        // Start download
                        link.click();

                        // Clean up and remove the link
                        link.parentNode.removeChild(link);

                        toast({
                            title: "Success",
                            status: "success",
                            description: "res.data.message",
                            isClosable: true,
                            position: "top",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        toast({
                            title: "Error",
                            status: "error",
                            description: err.message,
                            isClosable: true,
                            position: "top",
                        });
                    });
            } else {
                toast({
                    title: "Warning",
                    status: "warning",
                    description: "Wrong date range",
                    isClosable: true,
                    position: "top",
                });
            }
        } else {
            toast({
                title: "Warning",
                status: "warning",
                description: "Start and end date is required",
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1  lg:grid-cols-2  2xl:grid-cols-3 gap-4">
                <Card size={"sm"} bgColor={"yellow.100"}>
                    <CardHeader>
                        <Heading size="md">Sale Report</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text className="flex items-center mb-1">
                            <PiExportLight className="me-1" /> Export sale report
                        </Text>
                        <div className="grid grid-cols-2 gap-1 mb-2">
                            <div>
                                <label htmlFor="startdatesale">Start Date</label>
                                <Input
                                    id="startdatesale"
                                    type="date"
                                    bg={"white"}
                                    onChange={(e) =>
                                        setSaleDate((old) => {
                                            return { ...old, startDate: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="enddatesale">End Date</label>
                                <Input
                                    id="enddatesale"
                                    type="date"
                                    bg={"white"}
                                    onChange={(e) =>
                                        setSaleDate((old) => {
                                            return { ...old, endDate: e.target.value };
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <Button colorScheme="blue" onClick={() => saleExport()}>
                            <PiMicrosoftExcelLogoDuotone size={20} className="me-2" /> Export
                        </Button>
                    </CardBody>
                </Card>
                <Card size={"sm"} bgColor={"teal.100"}>
                    <CardHeader>
                        <Heading size="md">Purchase Report</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text className="flex items-center mb-1">
                            <PiExportLight className="me-1" /> Export purchase report
                        </Text>
                        <div className="grid grid-cols-2 gap-1 mb-2">
                            <div>
                                <label htmlFor="startdatepurchase">Start Date</label>
                                <Input
                                    id="startdatepurchase"
                                    type="date"
                                    bg={"white"}
                                    onChange={(e) =>
                                        setPurchaseDate((old) => {
                                            return { ...old, startDate: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="enddatepurchase">End Date</label>
                                <Input
                                    id="enddatepurchase"
                                    type="date"
                                    bg={"white"}
                                    onChange={(e) =>
                                        setPurchaseDate((old) => {
                                            return { ...old, endDate: e.target.value };
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <Button colorScheme="yellow" onClick={() => purchaseExport()}>
                            <PiMicrosoftExcelLogoDuotone size={20} className="me-2" /> Export
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DownloadReport;
