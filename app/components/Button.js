import Link from "next/link";

const Button = (props) => {
    return (
        <Link href={props.link} className="bg-blue-300 hover:bg-blue-500 text-white text-sm py-1 px-3 rounded-full">
            {props.text}
        </Link>
    );
};

export default Button;