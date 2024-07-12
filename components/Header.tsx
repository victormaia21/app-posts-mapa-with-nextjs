'use client'
import { Box, TextField } from "@mui/material";
import Link from "next/link";
import useStore from "@/util/useStore";

export default function Header() {
    
    const { onChangeSearch } = useStore();

    return (
        <header className="header">
            <ul>
                <li><Link href="/">Posts</Link></li>
            </ul>
            <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => onChangeSearch(e.target.value)}/>
                </Box>
            </div>
        </header>
    )
}