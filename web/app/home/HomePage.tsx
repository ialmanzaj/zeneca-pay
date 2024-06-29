'use client';
import { ArrowUpRight } from "lucide-react"
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
//mport Footer from '@/components/footer';
import Header from '@/components/header';
import Main from '@/components/main';
import Footer from '@/components/footer';
//import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
//import PaymentLinkModal from '@/components/PaymentLinkModal';
import PaymentLinkModal from '@/components/PaymentLinkModal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PaymentLink {
    id: string;
    url: string;
    title: string;
    amount: number;
    currency: string;
    description: string;
}


/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
    const account = useAccount();
    const [links, setLinks] = useState<PaymentLink[]>([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USDC');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLink: PaymentLink = {
            id: '123',//uuidv4(),
            title,
            amount: parseFloat(amount),
            currency,
            description,
            url,
        };
        setLinks([...links, newLink]);
        setTitle('');
        setAmount('');
        setDescription('');
        setUrl('');
    };

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('/api/payment-links');
                if (!response.ok) {
                    throw new Error('Failed to fetch payment links');
                }
                const data = await response.json();
                setLinks(data);
            } catch (error) {
                console.error('Error fetching payment links:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        fetchLinks();
    }, []);


    return (
        <div id="page-container">
            <Header />
            <Main>
                <div className="container mx-auto p-4">

                   
                    <Card
                        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Payment Links</CardTitle>
                                <CardDescription>
                                    Create a payment link to send to your customers.
                                </CardDescription>
    
                            </div>
                            <PaymentLinkModal />
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-left">Title</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead className="text-right">Currency</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {links.map((link) => (
                                        <>
                                            <TableRow key={link.id}>
                                                <TableCell>
                                                    <div className="font-medium">{link.title}</div>
                                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                                        {link.description}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="font-medium">
                                                    {link.amount}
                                                </TableCell>
                                                <TableCell className="text-right">{link.currency}</TableCell>
                                            </TableRow>



                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </div>
            </Main>
            <Footer />
        </div>
    )
}