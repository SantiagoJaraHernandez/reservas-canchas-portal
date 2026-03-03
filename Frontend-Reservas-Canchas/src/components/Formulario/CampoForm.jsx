function CampoForm({ label, icono, type, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#FFF] uppercase tracking-wider">
                {label}
            </label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2af86f] text-sm">
                    {icono}
                </span>
                <input
                    type={type}
                    className="w-full pl-10 py-4 rounded-xl focus:ring-[#13ec5b] focus:border-primary transition-all input-glass outline-0"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default CampoForm;
