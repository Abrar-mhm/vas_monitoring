<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            border: 1px solid #e5e7eb;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .message {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background-color: #0066CC;
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 13px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 11px;
            color: #9ca3af;
            text-align: center;
        }
        .link {
            word-break: break-all;
            font-size: 11px;
            color: #6b7280;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <h2 style="color: #0066CC; margin: 0;">VAS Monitoring</h2>
            <p style="color: #9ca3af; font-size: 11px; margin: 5px 0 0 0;">Tunisie Telecom</p>
        </div>

        <p class="title">Réinitialisation de votre mot de passe</p>

        <p class="message">
            Vous avez demandé la réinitialisation de votre mot de passe.<br>
            Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.<br><br>
            Ce lien expire dans <strong>1 heure</strong>.
        </p>

        <a href="{{ $resetLink }}" class="button">
            Réinitialiser mon mot de passe
        </a>

        <p class="link">
            Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
            {{ $resetLink }}
        </p>

        <div class="footer">
            Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.<br>
            © {{ date('Y') }} Tunisie Telecom. Tous droits réservés.
        </div>
    </div>
</body>
</html>