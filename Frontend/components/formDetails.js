
export default function formDetails() {
    const name = "name";
    const Details = "details";

    return (
    <div>
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
            Name: {name}
        </h1>
        <h2 className="text-gray-400 text-md">
            Details: {Details}
        </h2>
    </div>
    );
}
