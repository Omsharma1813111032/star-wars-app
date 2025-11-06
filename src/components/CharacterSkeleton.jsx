export default function CharacterSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl p-4 bg-[#1a1a1a] border border-[#ffe81f20]">
            <div className="w-full h-48 bg-[#2a2a2a] rounded-lg mb-3" />
            <div className="h-4 bg-[#2a2a2a] rounded w-3/4 mb-2" />
            <div className="h-3 bg-[#2a2a2a] rounded w-1/2" />
        </div>
    );
}
