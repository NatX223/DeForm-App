
export default function FormDetails({ item }) {

    return (
    <div>
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
            Name: {item[0]}
        </h1>
        <h2 className="text-gray-400 text-md">
            Details: {item[1]}
        </h2>
    </div>
    );
}
