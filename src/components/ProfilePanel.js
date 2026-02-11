import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePanel() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [touched, setTouched] = useState({ name: false, password: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  // mantém o name sincronizado se o user mudar (ex: login)
  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  const errors = useMemo(() => {
    const e = {};
    const nameTrim = name.trim();

    if (!nameTrim) e.name = "Name is required.";
    else if (nameTrim.length < 2) e.name = "Name must be at least 2 characters.";

    // senha é opcional: só valida se a pessoa digitar algo
    if (password) {
      if (password.length < 6) e.password = "Password must be at least 6 characters.";
      if (confirm !== password) e.confirm = "Passwords do not match.";
    }

    return e;
  }, [name, password, confirm]);

  const isValid = Object.keys(errors).length === 0;

  const onSave = async (e) => {
    e.preventDefault();
    setAlert({ type: "", msg: "" });
    setTouched({ name: true, password: true, confirm: true });

    if (!isValid) return;

    try {
      setSaving(true);

      // “atualiza” no contexto/localStorage
      updateProfile({
        name: name.trim(),
        // só manda senha se tiver preenchida
        password: password ? password : undefined,
      });

      setPassword("");
      setConfirm("");
      setTouched({ name: false, password: false, confirm: false });

      setAlert({ type: "success", msg: "Profile updated successfully." });
    } catch (err) {
      setAlert({ type: "danger", msg: "Could not update profile. Try again." });
    } finally {
      setSaving(false);
    }
  };

  const show = (key) => touched[key] && errors[key];

  return (
    <div className="card border-0 rounded-4">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="h5 fw-semibold mb-0">Profile</h2>
            <div className="text-secondary small">Update your name and password.</div>
          </div>
        </div>

        {alert.msg ? (
          <div className={`alert alert-${alert.type} py-2`} role="alert">
            {alert.msg}
          </div>
        ) : null}

        <form onSubmit={onSave} className="row g-3" noValidate>
          {/* Email bloqueado */}
          <div className="col-12">
            <label className="form-label mb-1">Email</label>
            <input
              type="email"
              className="form-control bg-light text-secondary"
              value={user?.email ?? ""}
              disabled
              aria-disabled="true"
            />
            <div className="form-text">Email can’t be changed.</div>
          </div>

          {/* Nome editável */}
          <div className="col-12">
            <label className="form-label mb-1">Name</label>
            <input
              type="text"
              className={`form-control ${show("name") ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Your name"
              autoComplete="name"
            />
            {show("name") ? <div className="invalid-feedback">{errors.name}</div> : null}
          </div>

          {/* Senha nova (opcional) */}
          <div className="col-12 col-md-6">
            <label className="form-label mb-1">New password</label>
            <input
              type="password"
              className={`form-control ${show("password") ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="Leave blank to keep"
              autoComplete="new-password"
            />
            {show("password") ? <div className="invalid-feedback">{errors.password}</div> : null}
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label mb-1">Confirm password</label>
            <input
              type="password"
              className={`form-control ${show("confirm") ? "is-invalid" : ""}`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
              placeholder="Repeat new password"
              autoComplete="new-password"
              disabled={!password}
            />
            {show("confirm") ? <div className="invalid-feedback">{errors.confirm}</div> : null}
          </div>

          <div className="col-12 d-flex justify-content-end gap-2 pt-1">
            <button
              type="button"
              className="btn btn-light border"
              onClick={() => {
                setName(user?.name ?? "");
                setPassword("");
                setConfirm("");
                setAlert({ type: "", msg: "" });
                setTouched({ name: false, password: false, confirm: false });
              }}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-dark" disabled={saving || !isValid}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
