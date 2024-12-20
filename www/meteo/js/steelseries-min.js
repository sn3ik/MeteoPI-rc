/*!
 * Name          : steelseries.js
 * Authors       : Gerrit Grunwald, Mark Crossley
 * Last modified : 25.09.2012
 * Revision      : 0.11.13
 *
 * Copyright (c) 2011, Gerrit Grunwald, Mark Crossley
 * All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification, are permitted
 *  provided that the following conditions are met:
 *
 *  # Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *  # Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 *   BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *   SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 *   DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *   INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 *   OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var steelseries = function() {
    function o(n, t) {
        var i = "#" === n.charAt(0) ? n.substring(1, 7) : n,
            r = parseInt(i.substring(0, 2), 16),
            u = parseInt(i.substring(2, 4), 16),
            f = parseInt(i.substring(4, 6), 16);
        return this.color = "rgba(" + r + "," + u + "," + f + "," + t + ")", this
    }

    function ii(t, i, r, u, f) {
        var c = 1 / 255,
            e = t.getRed(),
            o = t.getGreen(),
            s = t.getBlue(),
            h = t.getAlpha(),
            p = i.getRed() - e,
            w = i.getGreen() - o,
            b = i.getBlue() - s,
            k = i.getAlpha() * c - h * c,
            l = p / r * u,
            a = w / r * u,
            v = b / r * u,
            y = k / r * u;
        return f = f || !1, f ? [(e + l).toFixed(0), (o + a).toFixed(0), (s + v).toFixed(0), h + y] : new n((e + l).toFixed(0), (o + a).toFixed(0), (s + v).toFixed(0), h + y)
    }

    function wr(n, t, i) {
        return {
            start: n,
            stop: t,
            color: i
        }
    }

    function a(n, t) {
        var u = Math.floor(Math.log10(n)),
            r = n / Math.pow(10, u),
            i;
        return i = t ? 1.5 > r ? 1 : 3 > r ? 2 : 7 > r ? 5 : 10 : 1 >= r ? 1 : 2 >= r ? 2 : 5 >= r ? 5 : 10, i * Math.pow(10, u)
    }

    function l(n, t, i, r, u, f) {
        var e = t + r,
            o = i + u;
        n.beginPath(), n.moveTo(t + f, i), n.lineTo(e - f, i), n.quadraticCurveTo(e, i, e, i + f), n.lineTo(e, i + u - f), n.quadraticCurveTo(e, o, e - f, o), n.lineTo(t + f, o), n.quadraticCurveTo(t, o, t, o - f), n.lineTo(t, i + f), n.quadraticCurveTo(t, i, t + f, i), n.closePath(), n.stroke()
    }

    function t(n, t) {
        var i = f.createElement("canvas");
        return i.width = n, i.height = t, i
    }

    function ei(n, t, i) {
        var r = f.createElement("canvas");
        return r.width = n, r.height = t, i(r.getContext("2d")), r
    }

    function st(n) {
        var t, i = ei(1, 1, function(t) {
            t.fillStyle = n, t.beginPath(), t.rect(0, 0, 1, 1), t.fill()
        });
        return t = i.getContext("2d").getImageData(0, 0, 2, 2).data, [t[0], t[1], t[2], t[3]]
    }

    function kt(t) {
        var u, f, e, o, s, r = st(t),
            i = new n(r[0], r[1], r[2], r[3]);
        return u = yi(i, .32), f = yi(i, .62), e = oi(i, .84), o = oi(i, .94), s = oi(i, 1), new nt(u, f, i, e, o, s)
    }

    function br(n, t, i) {
        var u, r, f, o, s, e;
        if (n /= 255, t /= 255, i /= 255, r = Math.max(n, t, i), u = Math.min(n, t, i), s = (r + u) / 2, r === u) f = o = 0;
        else {
            e = r - u, o = s > .5 ? e / (2 - r - u) : e / (r + u);
            switch (r) {
                case n:
                    f = (t - i) / e + (t < i ? 6 : 0);
                    break;
                case t:
                    f = (i - n) / e + 2;
                    break;
                case i:
                    f = (n - t) / e + 4
            }
            f /= 6
        }
        return [f, o, s]
    }

    function pt(n, t, i) {
        var r, u, f, h = Math.floor(n * 6),
            c = n * 6 - h,
            e = i * (1 - t),
            o = i * (1 - c * t),
            s = i * (1 - (1 - c) * t);
        switch (h % 6) {
            case 0:
                r = i, u = s, f = e;
                break;
            case 1:
                r = o, u = i, f = e;
                break;
            case 2:
                r = e, u = i, f = s;
                break;
            case 3:
                r = e, u = o, f = i;
                break;
            case 4:
                r = s, u = e, f = i;
                break;
            case 5:
                r = i, u = e, f = o
        }
        return [Math.floor(r * 255), Math.floor(u * 255), Math.floor(f * 255)]
    }

    function vt(n, t, i) {
        var e, r, u, o, s, f;
        if (n = n / 255, t = t / 255, i = i / 255, r = Math.max(n, t, i), e = Math.min(n, t, i), s = r, f = r - e, o = r === 0 ? 0 : f / r, r === e) u = 0;
        else {
            switch (r) {
                case n:
                    u = (t - i) / f + (t < i ? 6 : 0);
                    break;
                case t:
                    u = (i - n) / f + 2;
                    break;
                case i:
                    u = (n - t) / f + 4
            }
            u /= 6
        }
        return [u, o, s]
    }

    function tt(n, t) {
        return n < 0 ? 0 : n > t ? t : n
    }

    function yi(t, i) {
        var r = Math.floor(t.getRed() * (1 - i)),
            u = Math.floor(t.getGreen() * (1 - i)),
            f = Math.floor(t.getBlue() * (1 - i));
        return r = tt(r, 255), u = tt(u, 255), f = tt(f, 255), new n(r, u, f, t.getAlpha())
    }

    function oi(t, i) {
        var r = Math.round(t.getRed() * (1 + i)),
            u = Math.round(t.getGreen() * (1 + i)),
            f = Math.round(t.getBlue() * (1 + i));
        return r = tt(r, 255), u = tt(u, 255), f = tt(f, 255), new n(r, u, f, t.getAlpha())
    }

    function kr(n, t, i) {
        var r, u;
        if (i <= t) throw "Rotary bounds are of negative or zero size";
        return r = i - t, u = Math.floor((n - t) / r), n - u * r
    }

    function si(n, t) {
        return kr(t - n, -180, 180)
    }
    var r = Math.PI / 2,
        i = Math.PI * 2,
        e = Math.PI,
        u = Math.PI / 180,
        ni = 180 / Math.PI,
        f = document,
        ut = "LCDMono2Ultra,sans-serif",
        ki = function(n, o) {
            o = o || {};
            var vt = undefined === o.gaugeType ? steelseries.GaugeType.TYPE4 : o.gaugeType,
                s = undefined === o.size ? 200 : o.size,
                v = undefined === o.minValue ? 0 : o.minValue,
                nt = undefined === o.maxValue ? v + 100 : o.maxValue,
                df = undefined === o.niceScale ? !0 : o.niceScale,
                ii = undefined === o.threshold ? (nt - v) / 2 : o.threshold,
                ri = undefined === o.section ? null : o.section,
                ui = undefined === o.area ? null : o.area,
                tu = undefined === o.titleString ? "" : o.titleString,
                iu = undefined === o.unitString ? "" : o.unitString,
                ru = undefined === o.frameDesign ? steelseries.FrameDesign.METAL : o.frameDesign,
                uu = undefined === o.frameVisible ? !0 : o.frameVisible,
                fi = undefined === o.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : o.backgroundColor,
                fu = undefined === o.backgroundVisible ? !0 : o.backgroundVisible,
                gt = undefined === o.pointerType ? steelseries.PointerType.TYPE1 : o.pointerType,
                eu = undefined === o.pointerColor ? steelseries.ColorDef.RED : o.pointerColor,
                gf = undefined === o.knobType ? steelseries.KnobType.STANDARD_KNOB : o.knobType,
                ei = undefined === o.knobStyle ? steelseries.KnobStyle.SILVER : o.knobStyle,
                hi = undefined === o.lcdColor ? steelseries.LcdColor.STANDARD : o.lcdColor,
                yr = undefined === o.lcdVisible ? !0 : o.lcdVisible,
                ou = undefined === o.lcdDecimals ? 2 : o.lcdDecimals,
                ne = undefined === o.digitalFont ? !1 : o.digitalFont,
                su = undefined === o.fractionalScaleDecimals ? 1 : o.fractionalScaleDecimals,
                pr = undefined === o.ledColor ? steelseries.LedColor.RED_LED : o.ledColor,
                hu = undefined === o.ledVisible ? !0 : o.ledVisible,
                cu = undefined === o.thresholdVisible ? !0 : o.thresholdVisible,
                wr = undefined === o.minMeasuredValueVisible ? !1 : o.minMeasuredValueVisible,
                br = undefined === o.maxMeasuredValueVisible ? !1 : o.maxMeasuredValueVisible,
                lu = undefined === o.foregroundType ? steelseries.ForegroundType.TYPE1 : o.foregroundType,
                au = undefined === o.foregroundVisible ? !0 : o.foregroundVisible,
                vu = undefined === o.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : o.labelNumberFormat,
                kr = undefined === o.playAlarm ? !1 : o.playAlarm,
                yu = undefined === o.alarmSound ? !1 : o.alarmSound,
                te = undefined === o.customLayer ? null : o.customLayer,
                ie = undefined === o.tickLabelOrientation ? vt === steelseries.GaugeType.TYPE1 ? steelseries.TickLabelOrientation.TANGENT : steelseries.TickLabelOrientation.NORMAL : o.tickLabelOrientation,
                dr = undefined === o.trendVisible ? !1 : o.trendVisible,
                ir = undefined === o.trendColors ? [steelseries.LedColor.RED_LED, steelseries.LedColor.GREEN_LED, steelseries.LedColor.CYAN_LED] : o.trendColors,
                rr = undefined === o.useOdometer ? !1 : o.useOdometer,
                ni = undefined === o.odometerParams ? {} : o.odometerParams,
                re = undefined === o.odometerUseValue ? !1 : o.odometerUseValue,
                pi;
            kr && yu !== !1 && (pi = f.createElement("audio"), pi.setAttribute("src", yu), pi.setAttribute("preload", "auto"));
            var tt = v,
                ur = v,
                ue = this,
                oi = nt,
                si = v,
                pt = !1,
                pu = 0,
                ci, wi = !1,
                wu = steelseries.TrendState.OFF,
                fr = s * .06,
                er = s * .29,
                or = s * .36,
                li, at, sr, wt, bt, gr = at + (tt - v) * bt,
                l = f.getElementById(n).getContext("2d");
            l.clearRect(0, 0, l.canvas.width, l.canvas.height), l.canvas.width = s, l.canvas.height = s;
            var w = s,
                rt = s,
                st = w / 2,
                ht = rt / 2,
                fe = .6 * w,
                ee = .4 * rt,
                nu = Math.floor(w / 10),
                oe = nu + "px sans-serif",
                se = nu + "px " + ut,
                bu = rt * .13,
                bi = w * .4,
                ku = (w - bi) / 2,
                du = rt * .57,
                gu, he = rt * .61,
                nf = w * .006,
                tf = !1,
                hr = v,
                cr = nt,
                ki = nt - v,
                kt = cr - hr,
                lr = 0,
                dt = 0,
                ai = 10,
                rf = 10,
                ce = function() {
                    df ? (ki = a(nt - v, !1), dt = a(ki / (rf - 1), !0), hr = Math.floor(v / dt) * dt, cr = Math.ceil(nt / dt) * dt, lr = a(dt / (ai - 1), !0), v = hr, nt = cr, kt = nt - v) : (ki = nt - v, hr = v, cr = nt, kt = ki, dt = a(ki / (rf - 1), !0), lr = a(dt / (ai - 1), !0));
                    switch (vt.type) {
                        case "type1":
                            li = 0, at = e, sr = r, wt = r, bt = wt / kt;
                            break;
                        case "type2":
                            li = 0, at = e, sr = r, wt = e, bt = wt / kt;
                            break;
                        case "type3":
                            li = 0, at = r, sr = 0, wt = 1.5 * e, bt = wt / kt;
                            break;
                        case "type4":
                        default:
                            li = 60 * u, at = r + li / 2, sr = 0, wt = i - li, bt = wt / kt
                    }
                    gr = at + (tt - v) * bt
                },
                di = t(s, s),
                uf = di.getContext("2d"),
                gi = t(s, s),
                ct = gi.getContext("2d"),
                ff, vi = t(s * .093457, s * .093457),
                ef = vi.getContext("2d"),
                ti = t(s * .093457, s * .093457),
                of = ti.getContext("2d"),
                yi = ti,
                sf = t(Math.ceil(s * .028037), Math.ceil(s * .028037)),
                le = sf.getContext("2d"),
                hf = t(Math.ceil(s * .028037), Math.ceil(s * .028037)),
                ae = hf.getContext("2d"),
                nr = t(s, s),
                cf = nr.getContext("2d"),
                tr = t(s, s),
                lf = tr.getContext("2d"),
                af, vf, yf, pf, wf, ar, bf;
            rr && yr && (ar = t(10, 10), bf = ar.getContext("2d"));
            var ve = function(n, t) {
                    n.restore(), n.save(), n.textAlign = "right", n.strokeStyle = hi.textColor, n.fillStyle = hi.textColor, (hi === steelseries.LcdColor.STANDARD || hi === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", n.shadowOffsetX = w * .007, n.shadowOffsetY = w * .007, n.shadowBlur = w * .007), n.font = ne ? se : oe, n.fillText(t.toFixed(ou), ku + bi - bi * .05, du + bu * .5 + nu * .38, bi * .9), n.restore()
                },
                ye = function(n) {
                    n.save(), "type1" === vt.type && n.drawImage(y(Math.ceil(rt * .037383), steelseries.KnobType.STANDARD_KNOB, ei), w * .523364, rt * .130841), ("type1" === vt.type || "type2" === vt.type) && n.drawImage(y(Math.ceil(rt * .037383), steelseries.KnobType.STANDARD_KNOB, ei), w * .130841, rt * .514018), ("type2" === vt.type || "type3" === vt.type) && n.drawImage(y(Math.ceil(rt * .037383), steelseries.KnobType.STANDARD_KNOB, ei), w * .831775, rt * .514018), "type3" === vt.type && n.drawImage(y(Math.ceil(rt * .037383), steelseries.KnobType.STANDARD_KNOB, ei), w * .523364, rt * .831775), "type4" === vt.type && (n.drawImage(y(Math.ceil(rt * .037383), steelseries.KnobType.STANDARD_KNOB, ei), w * .336448, rt * .803738), n.drawImage(y(Math.ceil(rt * .037383), steelseries.KnobType.STANDARD_KNOB, ei), w * .626168, rt * .803738)), n.restore()
                },
                pe = function() {
                    var t = f.createElement("canvas"),
                        n, i;
                    return t.width = Math.ceil(s * .046728), t.height = Math.ceil(t.width * .9), n = t.getContext("2d"), n.save(), i = n.createLinearGradient(0, .1, 0, t.height * .9), i.addColorStop(0, "#520000"), i.addColorStop(.3, "#fc1d00"), i.addColorStop(.59, "#fc1d00"), i.addColorStop(1, "#520000"), n.fillStyle = i, n.beginPath(), n.moveTo(t.width * .5, .1), n.lineTo(t.width * .9, t.height * .9), n.lineTo(t.width * .1, t.height * .9), n.lineTo(t.width * .5, .1), n.closePath(), n.fill(), n.strokeStyle = "#FFFFFF", n.stroke(), n.restore(), t
                },
                kf = function(n, t, i, r, u) {
                    if (t < v ? t = v : t > nt && (t = nt), i < v ? i = v : i > nt && (i = nt), !(t >= i)) {
                        n.save(), n.strokeStyle = r, n.fillStyle = r, n.lineWidth = w * .035;
                        var f = wt / kt * t - wt / kt * v,
                            e = f + (i - t) / (kt / wt);
                        n.translate(st, ht), n.rotate(at), n.beginPath(), u ? (n.moveTo(0, 0), n.arc(0, 0, w * .365 - n.lineWidth / 2, f, e, !1)) : n.arc(0, 0, w * .365, f, e, !1), u ? (n.moveTo(0, 0), n.fill()) : n.stroke(), n.translate(-st, -ht), n.restore()
                    }
                },
                we = function(n, t) {
                    var y = Math.ceil(w * .04),
                        f = at,
                        i = bt * lr,
                        u, o = v,
                        s = ai - 1,
                        c = w * .38,
                        p = w * .35,
                        b = w * .355,
                        k = w * .36,
                        a = w * .3,
                        h = w * .1,
                        d = ai / 2,
                        g = parseFloat(nt.toFixed(2)),
                        l;
                    for (fi.labelColor.setAlpha(1), n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = y + "px sans-serif", n.strokeStyle = fi.labelColor.getRgbaColor(), n.fillStyle = fi.labelColor.getRgbaColor(), n.translate(st, ht), n.rotate(at), (vt.type === "type1" || vt.type === "type2") && (h = w * .035), l = v; parseFloat(l.toFixed(2)) <= g; l += lr) {
                        if (u = i + r, s++, s === ai) {
                            n.lineWidth = 1.5, n.beginPath(), n.moveTo(c, 0), n.lineTo(p, 0), n.closePath(), n.stroke(), n.save(), n.translate(a, 0);
                            switch (ie.type) {
                                case "horizontal":
                                    u = -f;
                                    break;
                                case "tangent":
                                    u = f <= r + e ? e : 0;
                                    break;
                                case "normal":
                                default:
                                    u = r
                            }
                            n.rotate(u);
                            switch (t.format) {
                                case "fractional":
                                    n.fillText(o.toFixed(su), 0, 0, h);
                                    break;
                                case "scientific":
                                    n.fillText(o.toPrecision(2), 0, 0, h);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(o.toFixed(0), 0, 0, h)
                            }
                            n.translate(-a, 0), n.restore(), o += dt, s = 0, n.rotate(i), f += i;
                            continue
                        }
                        0 == ai % 2 && s === d ? (n.lineWidth = 1, n.beginPath(), n.moveTo(c, 0), n.lineTo(b, 0), n.closePath(), n.stroke()) : (n.lineWidth = .5, n.beginPath(), n.moveTo(c, 0), n.lineTo(k, 0), n.closePath(), n.stroke()), n.rotate(i), f += i
                    }
                    n.translate(-st, -ht), n.restore()
                },
                ft = function(n) {
                    var t, i, f;
                    n = n || {};
                    var e = undefined === n.frame ? !1 : n.frame,
                        u = undefined === n.background ? !1 : n.background,
                        o = undefined === n.led ? !1 : n.led,
                        h = undefined === n.pointer ? !1 : n.pointer,
                        l = undefined === n.foreground ? !1 : n.foreground,
                        a = undefined === n.trend ? !1 : n.trend,
                        y = undefined === n.odo ? !1 : n.odo;
                    if (tf = !0, ce(), e && uu && b(uf, ru, st, ht, w, rt), u && fu && (d(ct, fi, st, ht, w, rt), ot(ct, te, st, ht, w, rt)), o && (ef.drawImage(c(Math.ceil(s * .093457), 1, pr), 0, 0), of .drawImage(c(Math.ceil(s * .093457), 0, pr), 0, 0)), wr && le.drawImage(p(Math.ceil(s * .028037), steelseries.ColorDef.BLUE.dark.getRgbaColor(), !0, !0), 0, 0), br && ae.drawImage(p(Math.ceil(s * .028037), steelseries.ColorDef.RED.medium.getRgbaColor(), !0), 0, 0), u && fu) {
                        if (ye(ct), null !== ri && 0 < ri.length) {
                            t = ri.length;
                            do t--, kf(ct, ri[t].start, ri[t].stop, ri[t].color, !1); while (0 < t)
                        }
                        if (null !== ui && 0 < ui.length) {
                            i = ui.length;
                            do i--, kf(ct, ui[i].start, ui[i].stop, ui[i].color, !0); while (0 < i)
                        }
                        we(ct, vu), yt(ct, w, rt, tu, iu, fi, !0, !0)
                    }
                    u && cu && (ct.save(), ct.translate(st, ht), ct.rotate(at + (ii - v) * bt + r), ct.translate(-st, -ht), ct.drawImage(pe(), w * .475, rt * .13), ct.translate(st, ht), ct.restore()), u && yr && (rr && y ? (wf = new steelseries.Odometer("", {
                        _context: bf,
                        height: s * .075,
                        decimals: ni.decimals,
                        digits: ni.digits === undefined ? 5 : ni.digits,
                        valueForeColor: ni.valueForeColor,
                        valueBackColor: ni.valueBackColor,
                        decimalForeColor: ni.decimalForeColor,
                        decimalBackColor: ni.decimalBackColor,
                        font: ni.font,
                        value: tt
                    }), gu = (w - ar.width) / 2) : rr || (ff = g(bi, bu, hi), ct.drawImage(ff, ku, du))), h && et(cf, w, gt, eu, fi.labelColor), l && au && (f = gt.type === "type15" || gt.type === "type16" ? !1 : !0, k(lf, lu, w, rt, f, gf, ei, vt)), a && dr && (af = it(fr, steelseries.TrendState.UP, ir), vf = it(fr, steelseries.TrendState.STEADY, ir), yf = it(fr, steelseries.TrendState.DOWN, ir), pf = it(fr, steelseries.TrendState.OFF, ir))
                },
                lt = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.led ? !1 : n.led,
                        u = undefined === n.pointer ? !1 : n.pointer,
                        f = undefined === n.foreground ? !1 : n.foreground;
                    t && (di.width = s, di.height = s, uf = di.getContext("2d")), i && (gi.width = s, gi.height = s, ct = gi.getContext("2d")), r && (vi.width = Math.ceil(s * .093457), vi.height = Math.ceil(s * .093457), ef = vi.getContext("2d"), ti.width = Math.ceil(s * .093457), ti.height = Math.ceil(s * .093457), of = ti.getContext("2d"), yi = ti), u && (nr.width = s, nr.height = s, cf = nr.getContext("2d")), f && (tr.width = s, tr.height = s, lf = tr.getContext("2d"))
                },
                be = function() {
                    hu && (yi = yi === vi ? ti : vi, wi || (wi = !0, h(ue.repaint)))
                },
                vr = function(n) {
                    n ? pu = setInterval(be, 1e3) : clearInterval(pu)
                };
            return this.setValue = function(n) {
                var t = n < v ? v : n > nt ? nt : n;
                tt !== t && (tt = t, tt > si && (si = tt), tt < oi && (oi = tt), tt >= ii && !pt ? (pt = !0, vr(pt), kr && pi.play()) : tt < ii && (pt = !1, vr(pt), kr && pi.pause()), this.repaint())
            }, this.getValue = function() {
                return tt
            }, this.setOdoValue = function(n) {
                var t = n < 0 ? 0 : n;
                ur !== t && (ur = t, this.repaint())
            }, this.getOdoValue = function() {
                return ur
            }, this.setValueAnimated = function(n) {
                var t = n < v ? v : n > nt ? nt : n,
                    i = this;
                tt !== t && (undefined !== ci && ci.playing && ci.stop(), ci = new Tween({}, "", Tween.regularEaseInOut, tt, t, 1), ci.onMotionChanged = function(n) {
                    tt = n.target._pos, tt >= ii && !pt ? (pt = !0, vr(pt)) : tt < ii && (pt = !1, vr(pt)), tt > si && (si = tt), tt < oi && (oi = tt), wi || (wi = !0, h(i.repaint))
                }, ci.start())
            }, this.resetMinMeasuredValue = function() {
                oi = tt, this.repaint()
            }, this.resetMaxMeasuredValue = function() {
                si = tt, this.repaint()
            }, this.setMinMeasuredValueVisible = function(n) {
                wr = n, this.repaint()
            }, this.setMaxMeasuredValueVisible = function(n) {
                br = n, this.repaint()
            }, this.setMaxMeasuredValue = function(n) {
                var t = n < v ? v : n > nt ? nt : n;
                si = t, this.repaint()
            }, this.setMinMeasuredValue = function(n) {
                var t = n < v ? v : n > nt ? nt : n;
                oi = n, this.repaint()
            }, this.setTitleString = function(n) {
                tu = n, lt({
                    background: !0
                }), ft({
                    background: !0
                }), this.repaint()
            }, this.setUnitString = function(n) {
                iu = n, lt({
                    background: !0
                }), ft({
                    background: !0
                }), this.repaint()
            }, this.setMinValue = function(n) {
                v = n, lt({
                    frame: !0,
                    background: !0
                }), ft({
                    frame: !0,
                    background: !0
                }), this.repaint()
            }, this.getMinValue = function() {
                return v
            }, this.setMaxValue = function(n) {
                nt = n, lt({
                    frame: !0,
                    background: !0
                }), ft({
                    frame: !0,
                    background: !0
                }), this.repaint()
            }, this.getMaxValue = function() {
                return nt
            }, this.setThreshold = function(n) {
                var t = n < v ? v : n > nt ? nt : n;
                ii = t, lt({
                    background: !0
                }), ft({
                    background: !0
                }), this.repaint()
            }, this.setArea = function(n) {
                ui = n, lt({
                    background: !0,
                    foreground: !0
                }), ft({
                    background: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setSection = function(n) {
                ri = n, lt({
                    background: !0,
                    foreground: !0
                }), ft({
                    background: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setThresholdVisible = function(n) {
                cu = n, this.repaint()
            }, this.setLcdDecimals = function(n) {
                ou = n, this.repaint()
            }, this.setFrameDesign = function(n) {
                lt({
                    frame: !0
                }), ru = n, ft({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                lt({
                    background: !0,
                    pointer: gt.type === "type2" || gt.type === "type13" ? !0 : !1
                }), fi = n, ft({
                    background: !0,
                    pointer: gt.type === "type2" || gt.type === "type13" ? !0 : !1
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                lt({
                    foreground: !0
                }), lu = n, ft({
                    foreground: !0
                }), this.repaint()
            }, this.setPointerType = function(n) {
                lt({
                    pointer: !0,
                    foreground: !0
                }), gt = n, ft({
                    pointer: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setPointerColor = function(n) {
                lt({
                    pointer: !0
                }), eu = n, ft({
                    pointer: !0
                }), this.repaint()
            }, this.setLedColor = function(n) {
                lt({
                    led: !0
                }), pr = n, ft({
                    led: !0
                }), this.repaint()
            }, this.setLcdColor = function(n) {
                hi = n, lt({
                    background: !0
                }), ft({
                    background: !0
                }), this.repaint()
            }, this.setTrend = function(n) {
                wu = n, this.repaint()
            }, this.setTrendVisible = function(n) {
                dr = n, this.repaint()
            }, this.setFractionalScaleDecimals = function(n) {
                su = n, lt({
                    background: !0
                }), ft({
                    background: !0
                }), this.repaint()
            }, this.setLabelNumberFormat = function(n) {
                vu = n, lt({
                    background: !0
                }), ft({
                    background: !0
                }), this.repaint()
            }, this.repaint = function() {
                if (tf || ft({
                        frame: !0,
                        background: !0,
                        led: !0,
                        pointer: !0,
                        trend: !0,
                        foreground: !0,
                        odo: !0
                    }), l.clearRect(0, 0, s, s), uu && l.drawImage(di, 0, 0), l.drawImage(gi, 0, 0), yr && (rr ? (wf.setValue(re ? tt : ur), l.drawImage(ar, gu, he)) : ve(l, tt)), hu && (tt < ii && (pt = !1, yi = ti), l.drawImage(yi, fe, ee)), dr) switch (wu.state) {
                    case "up":
                        l.drawImage(af, er, or);
                        break;
                    case "steady":
                        l.drawImage(vf, er, or);
                        break;
                    case "down":
                        l.drawImage(yf, er, or);
                        break;
                    case "off":
                        l.drawImage(pf, er, or)
                }
                wr && (l.save(), l.translate(st, ht), l.rotate(at + r + (oi - v) * bt), l.translate(-st, -ht), l.drawImage(sf, l.canvas.width * .4865, l.canvas.height * .105), l.restore()), br && (l.save(), l.translate(st, ht), l.rotate(at + r + (si - v) * bt), l.translate(-st, -ht), l.drawImage(hf, l.canvas.width * .4865, l.canvas.height * .105), l.restore()), gr = at + r + (tt - v) * bt, l.save(), l.translate(st, ht), l.rotate(gr), l.translate(-st, -ht), l.shadowColor = "rgba(0, 0, 0, 0.8)", l.shadowOffsetX = l.shadowOffsetY = nf, l.shadowBlur = nf * 2, l.drawImage(nr, 0, 0), l.restore(), au && l.drawImage(tr, 0, 0), wi = !1
            }, this.repaint(), this
        },
        di = function(n, o) {
            var vi;
            o = o || {};
            var li = undefined === o.gaugeType ? steelseries.GaugeType.TYPE4 : o.gaugeType,
                s = undefined === o.size ? 200 : o.size,
                l = undefined === o.minValue ? 0 : o.minValue,
                y = undefined === o.maxValue ? l + 100 : o.maxValue,
                cf = undefined === o.niceScale ? !0 : o.niceScale,
                ri = undefined === o.threshold ? (y - l) / 2 : o.threshold,
                ii = undefined === o.section ? null : o.section,
                kr = undefined === o.useSectionColors ? !1 : o.useSectionColors,
                dr = undefined === o.titleString ? "" : o.titleString,
                gr = undefined === o.unitString ? "" : o.unitString,
                nu = undefined === o.frameDesign ? steelseries.FrameDesign.METAL : o.frameDesign,
                tu = undefined === o.frameVisible ? !0 : o.frameVisible,
                ui = undefined === o.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : o.backgroundColor,
                iu = undefined === o.backgroundVisible ? !0 : o.backgroundVisible,
                nr = undefined === o.valueColor ? steelseries.ColorDef.RED : o.valueColor,
                fi = undefined === o.lcdColor ? steelseries.LcdColor.STANDARD : o.lcdColor,
                ru = undefined === o.lcdVisible ? !0 : o.lcdVisible,
                uu = undefined === o.lcdDecimals ? 2 : o.lcdDecimals,
                lf = undefined === o.digitalFont ? !1 : o.digitalFont,
                fu = undefined === o.fractionalScaleDecimals ? 1 : o.fractionalScaleDecimals,
                af = undefined === o.customLayer ? null : o.customLayer,
                lr = undefined === o.ledColor ? steelseries.LedColor.RED_LED : o.ledColor,
                eu = undefined === o.ledVisible ? !0 : o.ledVisible,
                ou = undefined === o.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : o.labelNumberFormat,
                su = undefined === o.foregroundType ? steelseries.ForegroundType.TYPE1 : o.foregroundType,
                hu = undefined === o.foregroundVisible ? !0 : o.foregroundVisible,
                ar = undefined === o.playAlarm ? !1 : o.playAlarm,
                cu = undefined === o.alarmSound ? !1 : o.alarmSound,
                ai = undefined === o.valueGradient ? null : o.valueGradient,
                lu = undefined === o.useValueGradient ? !1 : o.useValueGradient,
                vf = undefined === o.tickLabelOrientation ? li === steelseries.GaugeType.TYPE1 ? steelseries.TickLabelOrientation.TANGENT : steelseries.TickLabelOrientation.NORMAL : o.tickLabelOrientation,
                vr = undefined === o.trendVisible ? !1 : o.trendVisible,
                tr = undefined === o.trendColors ? [steelseries.LedColor.RED_LED, steelseries.LedColor.GREEN_LED, steelseries.LedColor.CYAN_LED] : o.trendColors;
            ar && cu !== !1 && (vi = f.createElement("audio"), vi.setAttribute("src", cu), vi.setAttribute("preload", "auto"));
            var et = l,
                lt = y - l,
                at = !1,
                au = 0,
                ei, yf = this,
                yi = !1,
                ct, tt, oi, bt, p, pt, vt, pf, si = [],
                ir = !1,
                yr = !1,
                w = f.getElementById(n).getContext("2d");
            w.clearRect(0, 0, w.canvas.width, w.canvas.height), w.canvas.width = s, w.canvas.height = s;
            var v = s,
                st = s,
                rt = v / 2,
                ft = st / 2,
                pr = Math.floor(v / 10),
                wf = pr + "px sans-serif",
                bf = pr + "px " + ut,
                wr = st * .13,
                pi = v * .4,
                vu = (v - pi) / 2,
                yu = st / 2 - wr / 2,
                kf = v * .116822,
                df = v * .485981,
                dt = Math.ceil(s * .093457),
                pu = v * .53,
                wu = st * .61,
                bu = steelseries.TrendState.OFF,
                rr = s * .06,
                ur = s * .38,
                fr = s * .57;
            switch (li.type) {
                case "type1":
                    ct = 0, tt = e, oi = 0, bt = r, p = r, pt = p * ni, vt = p / lt;
                    break;
                case "type2":
                    ct = 0, tt = e, oi = 0, bt = r, p = e, pt = p * ni, vt = p / lt;
                    break;
                case "type3":
                    ct = 0, tt = r, oi = -r, bt = 0, p = 1.5 * e, pt = p * ni, vt = p / lt;
                    break;
                case "type4":
                default:
                    ct = 60 * u, tt = r + ct / 2, oi = -i / 6, bt = 0, p = i - ct, pt = p * ni, vt = p / lt
            }
            var wi = t(s, s),
                ku = wi.getContext("2d"),
                bi = t(s, s),
                gt = bi.getContext("2d"),
                du, ki = t(Math.ceil(s * .060747), Math.ceil(s * .023364)),
                br = ki.getContext("2d"),
                hi = t(dt, dt),
                gu = hi.getContext("2d"),
                ti = t(dt, dt),
                nf = ti.getContext("2d"),
                ci = ti,
                gf, di = t(s, s),
                tf = di.getContext("2d"),
                rf, uf, ff, ef, of = !1,
                er = l,
                or = y,
                gi = y - l;
            lt = or - er;
            var sr = 0,
                wt = 0,
                hr = 10,
                sf = 10,
                ne = function() {
                    cf ? (gi = a(y - l, !1), wt = a(gi / (sf - 1), !0), er = Math.floor(l / wt) * wt, or = Math.ceil(y / wt) * wt, sr = a(wt / (hr - 1), !0), l = er, y = or, lt = y - l) : (gi = y - l, er = l, or = y, lt = gi, wt = a(gi / (sf - 1), !0), sr = a(wt / (hr - 1), !0));
                    switch (li.type) {
                        case "type1":
                            ct = 0, tt = e, bt = r, p = r, vt = p / lt;
                            break;
                        case "type2":
                            ct = 0, tt = e, bt = r, p = e, vt = p / lt;
                            break;
                        case "type3":
                            ct = 0, tt = r, bt = 0, p = 1.5 * e, vt = p / lt;
                            break;
                        case "type4":
                        default:
                            ct = 60 * u, tt = r + ct / 2, bt = 0, p = i - ct, vt = p / lt
                    }
                    pf = tt + (et - l) * vt
                },
                nt = function(n) {
                    var t;
                    n = n || {};
                    var r = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        u = undefined === n.led ? !1 : n.led,
                        f = undefined === n.value ? !1 : n.value,
                        e = undefined === n.foreground ? !1 : n.foreground,
                        o = undefined === n.trend ? !1 : n.trend;
                    if ( of = !0, ne(), r && tu && b(ku, nu, rt, ft, v, st), i && iu && (d(gt, ui, rt, ft, v, st), ot(gt, af, rt, ft, v, st)), u && (gu.drawImage(c(dt, 1, lr), 0, 0), nf.drawImage(c(dt, 0, lr), 0, 0), gf = gt.getImageData(pu, wu, dt, dt)), i && te(gt), i && iu && (re(gt, ou), yt(gt, v, st, dr, gr, ui, !0, !0)), i && ru && (du = g(pi, wr, fi), gt.drawImage(du, vu, yu)), ir = !1, kr && null !== ii && 0 < ii.length) {
                        ir = !0, t = ii.length, si = [];
                        do t--, si.push({
                            start: (ii[t].start + Math.abs(l)) / (y - l) * pt,
                            stop: (ii[t].stop + Math.abs(l)) / (y - l) * pt,
                            color: kt(ii[t].color)
                        }); while (0 < t)
                    }
                    yr = !1, lu && ai !== null && (ir = !1, yr = !0), f && hf(br, nr), e && hu && k(tf, su, v, st, !1), o && vr && (rf = it(rr, steelseries.TrendState.UP, tr), uf = it(rr, steelseries.TrendState.STEADY, tr), ff = it(rr, steelseries.TrendState.DOWN, tr), ef = it(rr, steelseries.TrendState.OFF, tr))
                },
                ht = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.led ? !1 : n.led,
                        u = undefined === n.value ? !1 : n.value,
                        f = undefined === n.foreground ? !1 : n.foreground;
                    t && (wi.width = s, wi.height = s, ku = wi.getContext("2d")), i && (bi.width = s, bi.height = s, gt = bi.getContext("2d")), u && (ki.width = Math.ceil(s * .060747), ki.height = Math.ceil(s * .023364), br = ki.getContext("2d")), r && (hi.width = Math.ceil(s * .093457), hi.height = Math.ceil(s * .093457), gu = hi.getContext("2d"), ti.width = Math.ceil(s * .093457), ti.height = Math.ceil(s * .093457), nf = ti.getContext("2d"), ci = ti), f && (di.width = s, di.height = s, tf = di.getContext("2d"))
                },
                te = function(n) {
                    var t, r, i;
                    n.save(), n.save(), n.lineWidth = s * .085, n.beginPath(), n.translate(rt, ft), n.rotate(tt - 4 * u), n.translate(-rt, -ft), n.arc(rt, ft, v * .35514, 0, p + 8 * u, !1), n.rotate(-tt), t = n.createLinearGradient(0, .107476 * st, 0, .897195 * st), t.addColorStop(0, "#000000"), t.addColorStop(.22, "#333333"), t.addColorStop(.76, "#333333"), t.addColorStop(1, "#cccccc"), n.strokeStyle = t, n.stroke(), n.restore(), n.save(), n.lineWidth = s * .075, n.beginPath(), n.translate(rt, ft), n.rotate(tt - 4 * u), n.translate(-rt, -ft), n.arc(rt, ft, v * .35514, 0, p + 8 * u, !1), n.rotate(-tt), r = n.createLinearGradient(0, .112149 * st, 0, .892523 * st), r.addColorStop(0, "#111111"), r.addColorStop(1, "#333333"), n.strokeStyle = r, n.stroke(), n.restore();
                    var e = (v * .116822 + v * .060747) / 2,
                        o = (v * .485981 + v * .023364) / 2,
                        f = n.createRadialGradient(e, o, 0, e, o, .030373 * v);
                    for (f.addColorStop(0, "#3c3c3c"), f.addColorStop(1, "#323232"), i = 0, i = 0; i <= pt; i += 5) n.save(), n.translate(rt, ft), n.rotate(i * u + oi), n.translate(-rt, -ft), n.beginPath(), n.rect(v * .116822, v * .485981, v * .060747, v * .023364), n.closePath(), n.fillStyle = f, n.fill(), n.restore();
                    n.restore()
                },
                hf = function(n, t) {
                    n.save(), n.beginPath(), n.rect(0, 0, n.canvas.width, n.canvas.height), n.closePath();
                    var r = n.canvas.width / 2,
                        u = n.canvas.height / 2,
                        i = w.createRadialGradient(r, u, 0, r, u, n.canvas.width / 2);
                    i.addColorStop(0, t.light.getRgbaColor()), i.addColorStop(1, t.dark.getRgbaColor()), n.fillStyle = i, n.fill(), n.restore()
                },
                ie = function(n, t) {
                    n.save(), n.textAlign = "right", n.strokeStyle = fi.textColor, n.fillStyle = fi.textColor, (fi === steelseries.LcdColor.STANDARD || fi === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", n.shadowOffsetX = v * .007, n.shadowOffsetY = v * .007, n.shadowBlur = v * .007), n.font = lf ? bf : wf, n.fillText(t.toFixed(uu), vu + pi - pi * .05, yu + wr * .5 + pr * .38, pi * .9), n.restore()
                },
                re = function(n, t) {
                    var f = tt,
                        i = vt * sr,
                        u, p = Math.ceil(v * .04),
                        o = l,
                        h = hr - 1,
                        a = v * .28,
                        s = v * .1,
                        w = parseFloat(y.toFixed(2)),
                        c;
                    for (ui.labelColor.setAlpha(1), n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = p + "px sans-serif", n.strokeStyle = ui.labelColor.getRgbaColor(), n.fillStyle = ui.labelColor.getRgbaColor(), n.translate(rt, ft), n.rotate(tt), (li.type === "type1" || li.type === "type2") && (s = v * .0375), c = l; parseFloat(c.toFixed(2)) <= w; c += sr) {
                        if (u = +i + r, h++, h === hr) {
                            n.save(), n.translate(a, 0);
                            switch (vf.type) {
                                case "horizontal":
                                    u = -f;
                                    break;
                                case "tangent":
                                    u = f <= r + e ? e : 0;
                                    break;
                                case "normal":
                                default:
                                    u = r
                            }
                            n.rotate(u);
                            switch (t.format) {
                                case "fractional":
                                    n.fillText(o.toFixed(fu), 0, 0, s);
                                    break;
                                case "scientific":
                                    n.fillText(o.toPrecision(2), 0, 0, s);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(o.toFixed(0), 0, 0, s)
                            }
                            n.translate(-a, 0), n.restore(), o += wt, h = 0, n.rotate(i), f += i;
                            continue
                        }
                        n.rotate(i), f += i
                    }
                    n.translate(-rt, -ft), n.restore()
                },
                cr = function(n) {
                    n ? au = setInterval(ue, 1e3) : clearInterval(au)
                },
                ue = function() {
                    eu && (ci = ci === hi ? ti : hi, yi || (yi = !0, h(yf.repaint)))
                };
            return this.setValue = function(n) {
                var t = n < l ? l : n > y ? y : n;
                et !== t && (et = t, et >= ri && !at ? (at = !0, cr(at), ar && vi.play()) : et < ri && (at = !1, cr(at), ar && vi.pause()), this.repaint())
            }, this.getValue = function() {
                return et
            }, this.setValueAnimated = function(n) {
                var t = n < l ? l : n > y ? y : n,
                    i = this;
                et !== t && (undefined !== ei && ei.playing && ei.stop(), ei = new Tween({}, "", Tween.regularEaseInOut, et, t, 1), ei.onMotionChanged = function(n) {
                    et = n.target._pos, et >= ri && !at ? (at = !0, cr(at)) : et < ri && (at = !1, cr(at)), yi || (yi = !0, h(i.repaint))
                }, ei.start())
            }, this.setFrameDesign = function(n) {
                ht({
                    frame: !0
                }), nu = n, nt({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                ht({
                    background: !0,
                    led: !0
                }), ui = n, nt({
                    background: !0,
                    led: !0
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                ht({
                    foreground: !0
                }), su = n, nt({
                    foreground: !0
                }), this.repaint()
            }, this.setValueColor = function(n) {
                ht({
                    value: !0
                }), nr = n, nt({
                    value: !0
                }), this.repaint()
            }, this.setLedColor = function(n) {
                ht({
                    led: !0
                }), lr = n, nt({
                    led: !0
                }), this.repaint()
            }, this.setLcdColor = function(n) {
                fi = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.setLcdDecimals = function(n) {
                uu = n, this.repaint()
            }, this.setSection = function(n) {
                ii = n, nt(), this.repaint()
            }, this.setSectionActive = function(n) {
                kr = n, nt(), this.repaint()
            }, this.setGradient = function(n) {
                ai = n, nt(), this.repaint()
            }, this.setGradientActive = function(n) {
                lu = n, nt(), this.repaint()
            }, this.setMinValue = function(n) {
                l = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.getMinValue = function() {
                return l
            }, this.setMaxValue = function(n) {
                y = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.getMaxValue = function() {
                return y
            }, this.setThreshold = function(n) {
                var t = n < l ? l : n > y ? y : n;
                ri = t, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.setTitleString = function(n) {
                dr = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.setUnitString = function(n) {
                gr = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.setTrend = function(n) {
                bu = n, this.repaint()
            }, this.setTrendVisible = function(n) {
                vr = n, this.repaint()
            }, this.setFractionalScaleDecimals = function(n) {
                fu = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.setLabelNumberFormat = function(n) {
                ou = n, ht({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.repaint = function() {
                var h = (et + Math.abs(l)) / (y - l) * pt,
                    t, f = nr,
                    n, i, e, o, r;
                for ( of || nt({
                        frame: !0,
                        background: !0,
                        led: !0,
                        value: !0,
                        trend: !0,
                        foreground: !0
                    }), w.clearRect(0, 0, s, s), tu && w.drawImage(wi, 0, 0), w.drawImage(bi, 0, 0), n = 0; n <= h; n += 5) {
                    if (t = nr, yr) e = l + n / pt * (y - l), o = ai.getEnd() - ai.getStart(), r = e / o, r = Math.max(Math.min(r, 1), 0), t = kt(ai.getColorAt(r).getRgbaColor());
                    else if (ir)
                        for (i = 0; i < si.length; i++)
                            if (n >= si[i].start && n < si[i].stop) {
                                t = si[i].color;
                                break
                            } f.medium.getHexColor() !== t.medium.getHexColor() && (hf(br, t), f = t), w.save(), w.translate(rt, ft), w.rotate(n * u + oi), w.translate(-rt, -ft), w.drawImage(ki, kf, df), w.restore()
                }
                if (ru && ie(w, et), eu && (et < ri && (at = !1, ci = ti), w.drawImage(ci, pu, wu)), vr) switch (bu.state) {
                    case "up":
                        w.drawImage(rf, ur, fr);
                        break;
                    case "steady":
                        w.drawImage(uf, ur, fr);
                        break;
                    case "down":
                        w.drawImage(ff, ur, fr);
                        break;
                    case "off":
                        w.drawImage(ef, ur, fr)
                }
                hu && w.drawImage(di, 0, 0), yi = !1
            }, this.repaint(), this
        },
        gi = function(n, i) {
            var ui;
            i = i || {};
            var ft = undefined === i.orientation ? steelseries.Orientation.NORTH : i.orientation,
                o = undefined === i.size ? 200 : i.size,
                v = undefined === i.minValue ? 0 : i.minValue,
                tt = undefined === i.maxValue ? v + 100 : i.maxValue,
                fu = undefined === i.niceScale ? !0 : i.niceScale,
                yt = undefined === i.threshold ? (tt - v) / 2 : i.threshold,
                pt = undefined === i.section ? null : i.section,
                wt = undefined === i.area ? null : i.area,
                nr = undefined === i.titleString ? "" : i.titleString,
                tr = undefined === i.unitString ? "" : i.unitString,
                ir = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                rr = undefined === i.frameVisible ? !0 : i.frameVisible,
                ot = undefined === i.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : i.backgroundColor,
                ur = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                st = undefined === i.pointerType ? steelseries.PointerType.TYPE1 : i.pointerType,
                fr = undefined === i.pointerColor ? steelseries.ColorDef.RED : i.pointerColor,
                eu = undefined === i.knobType ? steelseries.KnobType.STANDARD_KNOB : i.knobType,
                ri = undefined === i.knobStyle ? steelseries.KnobStyle.SILVER : i.knobStyle,
                wi = undefined === i.ledColor ? steelseries.LedColor.RED_LED : i.ledColor,
                er = undefined === i.ledVisible ? !0 : i.ledVisible,
                or = undefined === i.thresholdVisible ? !0 : i.thresholdVisible,
                bi = undefined === i.minMeasuredValueVisible ? !1 : i.minMeasuredValueVisible,
                ki = undefined === i.maxMeasuredValueVisible ? !1 : i.maxMeasuredValueVisible,
                sr = undefined === i.foregroundType ? steelseries.ForegroundType.TYPE1 : i.foregroundType,
                hr = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                ou = undefined === i.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : i.labelNumberFormat,
                di = undefined === i.playAlarm ? !1 : i.playAlarm,
                cr = undefined === i.alarmSound ? !1 : i.alarmSound;
            di && cr !== !1 && (ui = f.createElement("audio"), ui.setAttribute("src", cr), ui.setAttribute("preload", "auto"));
            var lr = steelseries.GaugeType.TYPE5,
                su = this,
                g = v,
                bt = tt,
                kt = v,
                l = o,
                nt = o,
                it = !1,
                ar = 0,
                dt, fi = !1,
                li = v,
                ai = tt,
                vi = tt - v,
                at = ai - li,
                yi = 0,
                ht = 0,
                ei = 10,
                hu = 10,
                cu = 0,
                ut = 1.25 * e,
                lu = 1.25 * e,
                gt = r,
                ct = gt / at,
                vr = l * .006,
                yr = l * 1.17 / 2,
                pr = !1,
                gi = ut + (g - v) * ct,
                u = f.getElementById(n).getContext("2d");
            u.clearRect(0, 0, u.canvas.width, u.canvas.height), u.canvas.width = o, u.canvas.height = o;
            var s = l / 2,
                rt = nt * .733644,
                au = .455 * l,
                vu = .51 * nt,
                yu = function() {
                    fu ? (vi = a(tt - v, !1), ht = a(vi / (hu - 1), !0), li = Math.floor(v / ht) * ht, ai = Math.ceil(tt / ht) * ht, yi = a(ht / (ei - 1), !0), v = li, tt = ai, at = tt - v) : (vi = tt - v, li = v, ai = tt, at = vi, yi = 1, ht = 10), cu = 0, ut = 1.25 * e, lu = 1.25 * e, gt = r, ct = gt / at, gi = ut + (g - v) * ct
                },
                oi = t(o, o),
                wr = oi.getContext("2d"),
                si = t(o, o),
                w = si.getContext("2d"),
                ni = t(o * .093457, o * .093457),
                br = ni.getContext("2d"),
                lt = t(o * .093457, o * .093457),
                kr = lt.getContext("2d"),
                ti = lt,
                dr = t(Math.ceil(o * .028037), Math.ceil(o * .028037)),
                gr = dr.getContext("2d"),
                nu = t(Math.ceil(o * .028037), Math.ceil(o * .028037)),
                tu = nu.getContext("2d"),
                hi = t(o, o),
                iu = hi.getContext("2d"),
                ci = t(o, o),
                ru = ci.getContext("2d"),
                pu = function(n) {
                    "type5" === lr.type && (n.save(), ft.type === "west" ? (n.drawImage(y(Math.ceil(nt * .037383), steelseries.KnobType.STANDARD_KNOB, ri), l * .44, nt * .8), n.drawImage(y(Math.ceil(nt * .037383), steelseries.KnobType.STANDARD_KNOB, ri), l * .44, nt * .16)) : (n.drawImage(y(Math.ceil(nt * .037383), steelseries.KnobType.STANDARD_KNOB, ri), l * .2 - nt * .037383, nt * .446666), n.drawImage(y(Math.ceil(nt * .037383), steelseries.KnobType.STANDARD_KNOB, ri), l * .8, nt * .446666)), n.restore())
                },
                wu = function() {
                    var t = f.createElement("canvas"),
                        n, i;
                    return t.width = Math.ceil(o * .046728), t.height = Math.ceil(t.width * .9), n = t.getContext("2d"), n.save(), i = n.createLinearGradient(0, .1, 0, t.height * .9), i.addColorStop(0, "#520000"), i.addColorStop(.3, "#fc1d00"), i.addColorStop(.59, "#fc1d00"), i.addColorStop(1, "#520000"), n.fillStyle = i, n.beginPath(), n.moveTo(t.width * .5, .1), n.lineTo(t.width * .9, t.height * .9), n.lineTo(t.width * .1, t.height * .9), n.lineTo(t.width * .5, .1), n.closePath(), n.fill(), n.strokeStyle = "#FFFFFF", n.stroke(), n.restore(), t
                },
                uu = function(n, t, i, r, u) {
                    n.save(), n.strokeStyle = r, n.fillStyle = r, n.lineWidth = l * .035;
                    var f = gt / at * t - gt / at * v,
                        e = f + (i - t) / (at / gt);
                    n.translate(s, rt), n.rotate(ut), n.beginPath(), u ? (n.moveTo(0, 0), n.arc(0, 0, l * .365 - n.lineWidth / 2, f, e, !1)) : n.arc(0, 0, l * .365, f, e, !1), u ? (n.moveTo(0, 0), n.fill()) : n.stroke(), n.translate(-s, -rt), n.restore()
                },
                bu = function(n) {
                    var t, i;
                    n.save(), n.textAlign = "left", n.textBaseline = "middle", n.strokeStyle = ot.labelColor.getRgbaColor(), n.fillStyle = ot.labelColor.getRgbaColor(), n.font = .046728 * l + "px sans-serif", t = n.measureText(nr).width, n.fillText(nr, (l - t) / 2, nt * .4, l * .3), i = n.measureText(tr).width, n.fillText(tr, (l - i) / 2, nt * .47, l * .2), n.restore()
                },
                ku = function(n, t) {
                    var c;
                    ot.labelColor.setAlpha(1), n.save(), steelseries.Orientation.WEST === ft && (n.translate(s, s), n.rotate(-r), n.translate(-s, -s)), n.textAlign = "center", n.textBaseline = "middle", c = Math.ceil(l * .04), n.font = c + "px sans-serif", n.strokeStyle = ot.labelColor.getRgbaColor(), n.fillStyle = ot.labelColor.getRgbaColor(), n.translate(s, rt), n.rotate(ut);
                    for (var f = ct * yi, a, i = v, u = ei - 1, e = l * .44, p = l * .41, w = l * .415, b = l * .42, y = l * .48, o = l * .0375, k = ei / 2, d = parseFloat(tt.toFixed(2)), h = v; parseFloat(h.toFixed(2)) <= d; h += yi) {
                        if (a = +f + r, u++, u === ei) {
                            n.lineWidth = 1.5, n.beginPath(), n.moveTo(e, 0), n.lineTo(p, 0), n.closePath(), n.stroke(), n.save(), n.translate(y, 0), n.rotate(a);
                            switch (t.format) {
                                case "fractional":
                                    n.fillText(i.toFixed(2), 0, 0, o);
                                    break;
                                case "scientific":
                                    n.fillText(i.toPrecision(2), 0, 0, o);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(i.toFixed(0), 0, 0, o)
                            }
                            n.translate(-y, 0), n.restore(), i += ht, u = 0, n.rotate(f);
                            continue
                        }
                        0 == ei % 2 && u === k ? (n.lineWidth = 1, n.beginPath(), n.moveTo(e, 0), n.lineTo(w, 0), n.closePath(), n.stroke()) : (n.lineWidth = .5, n.beginPath(), n.moveTo(e, 0), n.lineTo(b, 0), n.closePath(), n.stroke()), n.rotate(f)
                    }
                    n.translate(-s, -rt), n.restore()
                },
                vt = function(n) {
                    var t, i, f;
                    n = n || {};
                    var e = undefined === n.frame ? !1 : n.frame,
                        u = undefined === n.background ? !1 : n.background,
                        h = undefined === n.led ? !1 : n.led,
                        a = undefined === n.pointer ? !1 : n.pointer,
                        y = undefined === n.foreground ? !1 : n.foreground;
                    if (pr = !0, yu(), e && rr && b(wr, ir, s, o / 2, l, nt), u && ur && d(w, ot, s, o / 2, l, nt), h && (br.drawImage(c(Math.ceil(o * .093457), 1, wi), 0, 0), kr.drawImage(c(Math.ceil(o * .093457), 0, wi), 0, 0)), bi && (gr.drawImage(p(Math.ceil(o * .028037), steelseries.ColorDef.BLUE.dark.getRgbaColor(), !0, !0), 0, 0), gr.restore()), ki && (tu.drawImage(p(Math.ceil(o * .028037), steelseries.ColorDef.RED.medium.getRgbaColor(), !0), 0, 0), tu.restore()), u && ur) {
                        if (pu(w), null !== pt && 0 < pt.length) {
                            w.save(), steelseries.Orientation.WEST === ft && (w.translate(s, s), w.rotate(-r), w.translate(-s, -s)), t = pt.length;
                            do t--, uu(w, pt[t].start, pt[t].stop, pt[t].color, !1); while (0 < t);
                            w.restore()
                        }
                        if (null !== wt && 0 < wt.length) {
                            steelseries.Orientation.WEST === ft && (w.translate(s, s), w.rotate(-r), w.translate(-s, -s)), i = wt.length;
                            do i--, uu(w, wt[i].start, wt[i].stop, wt[i].color, !0); while (0 < i);
                            w.restore()
                        }
                        ku(w, ou), bu(w)
                    }
                    or && (w.save(), steelseries.Orientation.WEST === ft && (w.translate(s, s), w.rotate(-r), w.translate(-s, -s)), w.translate(s, rt), w.rotate(ut + (yt - v) * ct + r), w.translate(-s, -rt), w.drawImage(wu(), l * .475, nt * .32), w.restore()), a && et(iu, l * 1.17, st, fr, ot.labelColor), y && hr && (f = st.type === "type15" || st.type === "type16" ? !1 : !0, k(ru, sr, l, nt, f, eu, ri, lr, ft))
                },
                ii = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.led ? !1 : n.led,
                        u = undefined === n.pointer ? !1 : n.pointer,
                        f = undefined === n.foreground ? !1 : n.foreground;
                    t && (oi.width = o, oi.height = o, wr = oi.getContext("2d")), i && (si.width = o, si.height = o, w = si.getContext("2d")), r && (ni.width = Math.ceil(o * .093457), ni.height = Math.ceil(o * .093457), br = ni.getContext("2d"), lt.width = Math.ceil(o * .093457), lt.height = Math.ceil(o * .093457), kr = lt.getContext("2d"), ti = lt), u && (hi.width = o, hi.height = o, iu = hi.getContext("2d")), f && (ci.width = o, ci.height = o, ru = ci.getContext("2d"))
                },
                pi = function(n) {
                    n ? ar = setInterval(du, 1e3) : clearInterval(ar)
                },
                du = function() {
                    er && (ti = ti === ni ? lt : ni, fi || (fi = !0, h(su.repaint)))
                };
            return this.setValue = function(n) {
                var t = n < v ? v : n > tt ? tt : n;
                g !== t && (g = t, g > kt && (kt = g), g < bt && (bt = g), g >= yt && !it ? (it = !0, pi(it), di && ui.play()) : g < yt && (it = !1, pi(it), di && ui.pause()), this.repaint())
            }, this.getValue = function() {
                return g
            }, this.setValueAnimated = function(n) {
                var t = n < v ? v : n > tt ? tt : n,
                    i = this;
                g !== t && (undefined !== dt && dt.playing && dt.stop(), dt = new Tween({}, "", Tween.regularEaseInOut, g, t, 1), dt.onMotionChanged = function(n) {
                    g = n.target._pos, g >= yt && !it ? (it = !0, pi(it)) : g < yt && (it = !1, pi(it)), g > kt && (kt = g), g < bt && (bt = g), fi || (fi = !0, h(i.repaint))
                }, dt.start())
            }, this.resetMinMeasuredValue = function() {
                bt = g, this.repaint()
            }, this.resetMaxMeasuredValue = function() {
                kt = g, this.repaint()
            }, this.setMinMeasuredValueVisible = function(n) {
                bi = n, this.repaint()
            }, this.setMaxMeasuredValueVisible = function(n) {
                ki = n, this.repaint()
            }, this.setThresholdVisible = function(n) {
                or = n, this.repaint()
            }, this.setFrameDesign = function(n) {
                ii({
                    frame: !0
                }), ir = n, vt({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                ii({
                    background: !0,
                    pointer: st.type === "type2" || st.type === "type13" ? !0 : !1
                }), ot = n, vt({
                    background: !0,
                    pointer: st.type === "type2" || st.type === "type13" ? !0 : !1
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                ii({
                    foreground: !0
                }), sr = n, vt({
                    foreground: !0
                }), this.repaint()
            }, this.setPointerType = function(n) {
                ii({
                    pointer: !0,
                    foreground: !0
                }), st = n, vt({
                    pointer: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setPointerColor = function(n) {
                ii({
                    pointer: !0
                }), fr = n, vt({
                    pointer: !0
                }), this.repaint()
            }, this.setLedColor = function(n) {
                ii({
                    led: !0
                }), wi = n, vt({
                    led: !0
                }), this.repaint()
            }, this.repaint = function() {
                pr || vt({
                    frame: !0,
                    background: !0,
                    led: !0,
                    pointer: !0,
                    foreground: !0
                }), u.clearRect(0, 0, o, o), u.save(), rr && u.drawImage(oi, 0, 0), u.drawImage(si, 0, 0), er && (g < yt && (it = !1, ti = lt), u.drawImage(ti, au, vu)), steelseries.Orientation.WEST === ft && (u.translate(s, s), u.rotate(-r), u.translate(-s, -s)), bi && (u.save(), u.translate(s, rt), u.rotate(ut + r + (bt - v) * ct), u.translate(-s, -rt), u.drawImage(dr, u.canvas.width * .4865, u.canvas.height * .27), u.restore()), ki && (u.save(), u.translate(s, rt), u.rotate(ut + r + (kt - v) * ct), u.translate(-s, -rt), u.drawImage(nu, u.canvas.width * .4865, u.canvas.height * .27), u.restore()), gi = ut + r + (g - v) * ct, u.save(), u.translate(s, rt), u.rotate(gi), u.shadowColor = "rgba(0, 0, 0, 0.8)", u.shadowOffsetX = u.shadowOffsetY = vr, u.shadowBlur = vr * 2, u.translate(-yr, -yr), u.drawImage(hi, 0, 0), u.restore(), hr && (steelseries.Orientation.WEST === ft && (u.translate(s, s), u.rotate(r), u.translate(-s, -s)), u.drawImage(ci, 0, 0)), u.restore(), fi = !1
            }, this.repaint(), this
        },
        nr = function(n, i) {
            var bt;
            i = i || {};
            var v = undefined === i.gaugeType ? steelseries.GaugeType.TYPE1 : i.gaugeType,
                b = undefined === i.width ? 140 : i.width,
                k = undefined === i.height ? 320 : i.height,
                o = undefined === i.minValue ? 0 : i.minValue,
                s = undefined === i.maxValue ? o + 100 : i.maxValue,
                tu = undefined === i.niceScale ? !0 : i.niceScale,
                ht = undefined === i.threshold ? (s - o) / 2 : i.threshold,
                bi = undefined === i.titleString ? "" : i.titleString,
                ki = undefined === i.unitString ? "" : i.unitString,
                sr = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                hr = undefined === i.frameVisible ? !0 : i.frameVisible,
                d = undefined === i.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : i.backgroundColor,
                cr = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                kt = undefined === i.valueColor ? steelseries.ColorDef.RED : i.valueColor,
                wt = undefined === i.lcdColor ? steelseries.LcdColor.STANDARD : i.lcdColor,
                ci = undefined === i.lcdVisible ? !0 : i.lcdVisible,
                lr = undefined === i.lcdDecimals ? 2 : i.lcdDecimals,
                iu = undefined === i.digitalFont ? !1 : i.digitalFont,
                ti = undefined === i.ledColor ? steelseries.LedColor.RED_LED : i.ledColor,
                ar = undefined === i.ledVisible ? !0 : i.ledVisible,
                vr = undefined === i.thresholdVisible ? !0 : i.thresholdVisible,
                di = undefined === i.minMeasuredValueVisible ? !1 : i.minMeasuredValueVisible,
                gi = undefined === i.maxMeasuredValueVisible ? !1 : i.maxMeasuredValueVisible,
                ru = undefined === i.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : i.labelNumberFormat,
                yr = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                ii = undefined === i.playAlarm ? !1 : i.playAlarm,
                pr = undefined === i.alarmSound ? !1 : i.alarmSound;
            ii && pr !== !1 && (bt = f.createElement("audio"), bt.setAttribute("src", pr), bt.setAttribute("preload", "auto"));
            var uu = this,
                y = o,
                ft = s,
                et = o;
            v.type !== "type1" && v.type !== "type2" && (v = steelseries.GaugeType.TYPE1);
            var dt, tt = !1,
                ri = !1,
                wr = 0,
                w = f.getElementById(n).getContext("2d");
            w.clearRect(0, 0, w.canvas.width, w.canvas.height), w.canvas.width = b, w.canvas.height = k;
            var e = b,
                u = k,
                l = b <= k,
                nr, tr, ot = Math.round((l ? k : b) * .05),
                it = Math.round((l ? b : k) * .05),
                ir, rr;
            l ? (nr = e / 2 - ot / 2, tr = (v.type === "type1" ? .053 : .038) * u, ir = Math.floor(u / 22) + "px sans-serif", rr = Math.floor(u / 22) + "px " + ut) : (nr = .89 * e, tr = u / 2 - ot / 2, ir = Math.floor(u / 10) + "px sans-serif", rr = Math.floor(u / 10) + "px " + ut);
            var br = !1,
                li = o,
                ai = s,
                vi = s - o,
                kr = ai - li,
                yi = 0,
                vt = 0,
                ui = 10,
                fu = 10,
                eu = function() {
                    tu ? (vi = a(s - o, !1), vt = a(vi / (fu - 1), !0), li = Math.floor(o / vt) * vt, ai = Math.ceil(s / vt) * vt, yi = a(vt / (ui - 1), !0), o = li, s = ai, kr = s - o) : (vi = s - o, li = o, ai = s, kr = vi, yi = 1, vt = 10)
                },
                fi = t(b, k),
                dr = fi.getContext("2d"),
                ei = t(b, k),
                nt = ei.getContext("2d"),
                pi, gt = t(ot, ot),
                ur = gt.getContext("2d"),
                pt = t(ot, ot),
                fr = pt.getContext("2d"),
                ni = pt,
                oi = t(it, it),
                gr = oi.getContext("2d"),
                si = t(it, it),
                nu = si.getContext("2d"),
                hi = t(b, k),
                er = hi.getContext("2d"),
                ou = function(n, t, i) {
                    n.save(), n.textAlign = "right", n.textBaseline = "middle", n.strokeStyle = wt.textColor, n.fillStyle = wt.textColor, (wt === steelseries.LcdColor.STANDARD || wt === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", i ? (n.shadowOffsetX = u * .003, n.shadowOffsetY = u * .003, n.shadowBlur = u * .004) : (n.shadowOffsetX = u * .007, n.shadowOffsetY = u * .007, n.shadowBlur = u * .009));
                    var r, f, o;
                    n.font = iu ? rr : ir, i ? (r = (e - e * .571428) / 2 + e * .571428 - 2, f = u * .88 + 1 + (u * .055 - 2) / 2, o = e * .7 - 2) : (r = e * .695 + e * .18 - 2, f = u * .22 + 1 + (u * .15 - 2) / 2, o = u * .22 - 2), n.fillText(t.toFixed(lr), r, f, o), n.restore()
                },
                su = function(n) {
                    var i = f.createElement("canvas"),
                        t, r;
                    return i.height = i.width = it, t = i.getContext("2d"), t.save(), r = t.createLinearGradient(0, .1, 0, i.height * .9), r.addColorStop(0, "#520000"), r.addColorStop(.3, "#fc1d00"), r.addColorStop(.59, "#fc1d00"), r.addColorStop(1, "#520000"), t.fillStyle = r, n ? (t.beginPath(), t.moveTo(.1, i.height * .5), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .9, i.height * .9), t.closePath()) : (t.beginPath(), t.moveTo(.1, .1), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .5, i.height * .9), t.closePath()), t.fill(), t.strokeStyle = "#FFFFFF", t.stroke(), t.restore(), i
                },
                hu = function(n, t, i) {
                    var f, ut;
                    d.labelColor.setAlpha(1), n.save(), n.textBaseline = "middle", f = e * .1, n.strokeStyle = d.labelColor.getRgbaColor(), n.fillStyle = d.labelColor.getRgbaColor();
                    var h = o,
                        a = ui - 1,
                        y, r, c, b, p, l, w = 1,
                        k, g, nt, tt, it, rt;
                    for (i ? (k = .34 * e, g = .36 * e, nt = .33 * e, tt = .36 * e, it = .32 * e, rt = .36 * e, n.textAlign = "right", c = 0, b = u * .12864, p = 0, l = v.type === "type1" ? u * .856796 - u * .12864 : u * .7475 - u * .12864, w = l / (s - o)) : (k = .65 * u, g = .63 * u, nt = .66 * u, tt = .63 * u, it = .67 * u, rt = .63 * u, n.textAlign = "center", b = 0, v.type === "type1" ? (c = e * .142857, p = e * .871012 - c) : (c = e * .19857, p = e * .82 - c), l = 0, w = p / (s - o)), ut = o, y = 0; ut <= s; ut += yi, y += yi) {
                        if (r = i ? b + l - y * w : c + y * w, a++, a === ui) {
                            if (n.lineWidth = 1.5, or(n, it, rt, r, i), i) switch (t.format) {
                                case "fractional":
                                    n.fillText(h.toFixed(2), e * .28, r, f);
                                    break;
                                case "scientific":
                                    n.fillText(h.toPrecision(2), e * .28, r, f);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(h.toFixed(0), e * .28, r, f)
                            } else switch (t.format) {
                                case "fractional":
                                    n.fillText(h.toFixed(2), r, u * .73, f);
                                    break;
                                case "scientific":
                                    n.fillText(h.toPrecision(2), r, u * .73, f);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(h.toFixed(0), r, u * .73, f)
                            }
                            h += vt, a = 0;
                            continue
                        }
                        0 == ui % 2 && a === ui / 2 ? (n.lineWidth = 1, or(n, nt, tt, r, i)) : (n.lineWidth = .5, or(n, k, g, r, i))
                    }
                    n.restore()
                },
                or = function(n, t, i, r, u) {
                    u ? (n.beginPath(), n.moveTo(t, r), n.lineTo(i, r), n.closePath(), n.stroke()) : (n.beginPath(), n.moveTo(r, t), n.lineTo(r, i), n.closePath(), n.stroke())
                },
                rt = function(n) {
                    n = n || {};
                    var a = undefined === n.frame ? !1 : n.frame,
                        t = undefined === n.background ? !1 : n.background,
                        y = undefined === n.led ? !1 : n.led,
                        h = undefined === n.foreground ? !1 : n.foreground,
                        i, r, f;
                    br = !0, eu(), a && hr && ct(dr, sr, e, u, l), t && cr && lt(nt, d, e, u, l), t && v.type === "type2" && vu(nt), y && (l ? (ur.drawImage(c(ot, 1, ti), 0, 0), fr.drawImage(c(ot, 0, ti), 0, 0)) : (ur.drawImage(c(ot, 1, ti), 0, 0), fr.drawImage(c(ot, 0, ti), 0, 0))), di && (l ? gr.drawImage(p(it, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, l), 0, 0) : gr.drawImage(p(it, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, l), 0, 0)), gi && (l ? nu.drawImage(p(it, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, l), 0, 0) : nu.drawImage(p(it, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, l), 0, 0)), t && cr && (hu(nt, ru, l), l ? yt(nt, e, u, bi, ki, d, l, null, ci, v) : yt(nt, e, u, bi, ki, d, l, null, ci, v)), t && vr && (nt.save(), l ? (i = v.type === "type1" ? .856796 : .7475, r = i - .12864, f = u * i - u * r * (ht / (s - o)), nt.translate(e * .365, f - it / 2)) : (i = v.type === "type1" ? .871012 : .82, r = i - (v.type === "type1" ? .142857 : .19857), f = e * r * ht / (s - o), nt.translate(e * (v.type === "type1" ? .142857 : .19857) - it / 2 + f, u * .58)), nt.drawImage(su(l), 0, 0), nt.restore()), t && ci && (l ? (pi = g(e * .571428, u * .055, wt), nt.drawImage(pi, (e - e * .571428) / 2, u * .88)) : (pi = g(e * .18, u * .15, wt), nt.drawImage(pi, e * .695, u * .22))), h && v.type === "type2" && au(er), h && yr && at(er, e, u, l, !1)
                },
                st = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.led ? !1 : n.led,
                        u = undefined === n.foreground ? !1 : n.foreground;
                    t && (fi.width = b, fi.height = k, dr = fi.getContext("2d")), i && (ei.width = b, ei.height = k, nt = ei.getContext("2d")), r && (gt.width = Math.ceil(b * .093457), gt.height = Math.ceil(k * .093457), ur = gt.getContext("2d"), pt.width = Math.ceil(b * .093457), pt.height = Math.ceil(k * .093457), fr = pt.getContext("2d"), ni = pt), u && (hi.width = b, hi.height = k, er = hi.getContext("2d"))
                },
                wi = function(n) {
                    n ? wr = setInterval(cu, 1e3) : clearInterval(wr)
                },
                cu = function() {
                    ar && (ni = ni === gt ? pt : gt, ri || (ri = !0, h(uu.repaint)))
                },
                lu = function(n, t, i) {
                    var u, e, r = d.labelColor,
                        f, a, p, h, c, w, b, st, ht, ct, lt, at, vt, yt, pt, it, k, rt, ut, g, nt, tt, ft, et, ot;
                    l ? (u = i * .12864, e = v.type === "type1" ? i * .856796 : i * .7475, f = e - u, a = f * (y - o) / (s - o), p = e - a, st = 0, ht = u, ct = 0, lt = e) : (v.type === "type1" ? (u = t * .871012, e = t * .142857) : (u = t * .82, e = t * .19857), f = u - e, a = f * (y - o) / (s - o), p = e, st = u, ht = 0, ct = e, lt = 0), v.type === "type1" && (g = d === steelseries.BackgroundColor.CARBON || d === steelseries.BackgroundColor.PUNCHED_SHEET || d === steelseries.BackgroundColor.STAINLESS || d === steelseries.BackgroundColor.BRUSHED_STAINLESS || d === steelseries.BackgroundColor.TURNED ? .3 : 0, nt = n.createLinearGradient(st, ht, ct, lt), r.setAlpha(.05 + g), nt.addColorStop(0, r.getRgbaColor()), r.setAlpha(.15 + g), nt.addColorStop(.48, r.getRgbaColor()), r.setAlpha(.15 + g), nt.addColorStop(.49, r.getRgbaColor()), r.setAlpha(.05 + g), nt.addColorStop(1, r.getRgbaColor()), n.fillStyle = nt, l ? n.fillRect(t * .435714, u, t * .142857, f) : n.fillRect(t * .142857, i * .435714, f, i * .142857), l ? (at = 0, vt = u, yt = 0, pt = u + f) : (at = t * .142857 + f, vt = 0, yt = t * .142857, pt = 0), tt = n.createLinearGradient(at, vt, yt, pt), r.setAlpha(.3 + g), tt.addColorStop(0, r.getRgbaColor()), r.setAlpha(.69), tt.addColorStop(.48, r.getRgbaColor()), r.setAlpha(.7), tt.addColorStop(.49, r.getRgbaColor()), r.setAlpha(.4), tt.addColorStop(1, r.getRgbaColor()), n.fillStyle = tt, l ? (n.fillRect(t * .435714, u, t * .007142, f), n.fillRect(t * .571428, u, t * .007142, f)) : (n.fillRect(t * .142857, i * .435714, f, i * .007142), n.fillRect(t * .142857, i * .571428, f, i * .007142))), l ? v.type === "type1" ? (h = t * .45, c = 0, w = t * .45 + t * .114285, b = 0) : (h = t / 2 - i * .0486 / 2, c = 0, w = h + i * .053, b = 0) : v.type === "type1" ? (h = 0, c = i * .45, w = 0, b = i * .45 + i * .114285) : (h = 0, c = i / 2 - t * .025, w = 0, b = c + t * .053), ft = n.createLinearGradient(h, c, w, b), ft.addColorStop(0, kt.medium.getRgbaColor()), ft.addColorStop(1, kt.light.getRgbaColor()), n.fillStyle = ft, et = v.type === "type1" ? 0 : l ? i * .05 : t * .05, l ? n.fillRect(h, p, w - h, a + et) : n.fillRect(p - et, c, a + et, b - c), v.type === "type1" && (l ? (it = t * .45, k = 0, rt = it + t * .05, ut = 0) : (it = 0, k = i * .45, rt = 0, ut = k + i * .05), ot = n.createLinearGradient(it, k, rt, ut), ot.addColorStop(0, "rgba(255, 255, 255, 0.7)"), ot.addColorStop(.98, "rgba(255, 255, 255, 0.0)"), n.fillStyle = ot, l ? n.fillRect(it, p, rt, a) : n.fillRect(p, k, a, ut - k))
                },
                au = function(n) {
                    var t = l ? u : e,
                        i;
                    n.save(), l ? n.translate(e / 2, 0) : (n.translate(e / 2, u / 2), n.rotate(r), n.translate(0, -e / 2 + e * .05)), n.beginPath(), n.moveTo(-.049 * t, .825 * t), n.bezierCurveTo(-.049 * t, .7975 * t, -.0264 * t, .775 * t, .0013 * t, .775 * t), n.bezierCurveTo(.0264 * t, .775 * t, .049 * t, .7975 * t, .049 * t, .825 * t), n.bezierCurveTo(.049 * t, .85 * t, .0264 * t, .8725 * t, .0013 * t, .8725 * t), n.bezierCurveTo(-.0264 * t, .8725 * t, -.049 * t, .85 * t, -.049 * t, .825 * t), n.closePath(), i = n.createRadialGradient(0 * t, .825 * t, 0, 0 * t, .825 * t, .049 * t), i.addColorStop(0, kt.medium.getRgbaColor()), i.addColorStop(.3, kt.medium.getRgbaColor()), i.addColorStop(1, kt.light.getRgbaColor()), n.fillStyle = i, n.fill(), n.beginPath(), l ? (n.moveTo(-.0365 * t, .8075 * t), n.bezierCurveTo(-.0365 * t, .7925 * t, -.0214 * t, .7875 * t, -.0214 * t, .7825 * t), n.bezierCurveTo(.0189 * t, .785 * t, .0365 * t, .7925 * t, .0365 * t, .8075 * t), n.bezierCurveTo(.0365 * t, .8175 * t, .0214 * t, .815 * t, .0013 * t, .8125 * t), n.bezierCurveTo(-.0189 * t, .8125 * t, -.0365 * t, .8175 * t, -.0365 * t, .8075 * t), i = n.createRadialGradient(0, .8 * t, 0, 0, .8 * t, .0377 * t)) : (n.beginPath(), n.moveTo(-.0214 * t, .86 * t), n.bezierCurveTo(-.0365 * t, .86 * t, -.0415 * t, .845 * t, -.0465 * t, .825 * t), n.bezierCurveTo(-.0465 * t, .805 * t, -.0365 * t, .7875 * t, -.0214 * t, .7875 * t), n.bezierCurveTo(-.0113 * t, .7875 * t, -.0163 * t, .8025 * t, -.0163 * t, .8225 * t), n.bezierCurveTo(-.0163 * t, .8425 * t, -.0113 * t, .86 * t, -.0214 * t, .86 * t), i = n.createRadialGradient(-.03 * t, .8225 * t, 0, -.03 * t, .8225 * t, .0377 * t)), i.addColorStop(0, "rgba(255, 255, 255, 0.55)"), i.addColorStop(1, "rgba(255, 255, 255, 0.05)"), n.fillStyle = i, n.closePath(), n.fill(), n.beginPath(), n.moveTo(-.0214 * t, .115 * t), n.bezierCurveTo(-.0214 * t, .1075 * t, -.0163 * t, .1025 * t, -.0113 * t, .1025 * t), n.bezierCurveTo(-.0113 * t, .1025 * t, -.0113 * t, .1025 * t, -.0113 * t, .1025 * t), n.bezierCurveTo(-.0038 * t, .1025 * t, .0013 * t, .1075 * t, .0013 * t, .115 * t), n.bezierCurveTo(.0013 * t, .115 * t, .0013 * t, .76 * t, .0013 * t, .76 * t), n.bezierCurveTo(.0013 * t, .7675 * t, -.0038 * t, .7725 * t, -.0113 * t, .7725 * t), n.bezierCurveTo(-.0113 * t, .7725 * t, -.0113 * t, .7725 * t, -.0113 * t, .7725 * t), n.bezierCurveTo(-.0163 * t, .7725 * t, -.0214 * t, .7675 * t, -.0214 * t, .76 * t), n.bezierCurveTo(-.0214 * t, .76 * t, -.0214 * t, .115 * t, -.0214 * t, .115 * t), n.closePath(), i = n.createLinearGradient(-.0189 * t, 0, .0013 * t, 0), i.addColorStop(0, "rgba(255, 255, 255, 0.1)"), i.addColorStop(.34, "rgba(255, 255, 255, 0.5)"), i.addColorStop(1, "rgba(255, 255, 255, 0.1)"), n.fillStyle = i, n.fill(), n.restore()
                },
                vu = function(n) {
                    var t = l ? u : e,
                        i;
                    n.save(), l ? n.translate(e / 2, 0) : (n.translate(e / 2, u / 2), n.rotate(r), n.translate(0, -e / 2 + e * .05)), n.beginPath(), n.moveTo(-.0516 * t, .825 * t), n.bezierCurveTo(-.0516 * t, .8525 * t, -.0289 * t, .875 * t, .0013 * t, .875 * t), n.bezierCurveTo(.0289 * t, .875 * t, .0516 * t, .8525 * t, .0516 * t, .825 * t), n.bezierCurveTo(.0516 * t, .8075 * t, .044 * t, .7925 * t, .0314 * t, .7825 * t), n.bezierCurveTo(.0314 * t, .7825 * t, .0314 * t, .12 * t, .0314 * t, .12 * t), n.bezierCurveTo(.0314 * t, .1025 * t, .0189 * t, .0875 * t, .0013 * t, .0875 * t), n.bezierCurveTo(-.0163 * t, .0875 * t, -.0289 * t, .1025 * t, -.0289 * t, .12 * t), n.bezierCurveTo(-.0289 * t, .12 * t, -.0289 * t, .7825 * t, -.0289 * t, .7825 * t), n.bezierCurveTo(-.0415 * t, .79 * t, -.0516 * t, .805 * t, -.0516 * t, .825 * t), n.closePath(), i = n.createLinearGradient(-.0163 * t, 0, .0289 * t, 0), i.addColorStop(0, "rgba(226, 226, 226, 0.5)"), i.addColorStop(.5, "rgba(226, 226, 226, 0.2)"), i.addColorStop(1, "rgba(226, 226, 226, 0.5)"), n.fillStyle = i, n.fill(), n.lineWidth = 1, n.strokeStyle = "rgba(153, 153, 153, 0.5)", n.stroke(), n.restore()
                };
            return this.setValue = function(n) {
                var t = n < o ? o : n > s ? s : n;
                y !== t && (y = t, y > et && (et = y), y < ft && (ft = y), y >= ht && !tt ? (tt = !0, wi(tt), ii && bt.play()) : y < ht && (tt = !1, wi(tt), ii && bt.pause()), this.repaint())
            }, this.getValue = function() {
                return y
            }, this.setValueAnimated = function(n) {
                var t = n < o ? o : n > s ? s : n,
                    i;
                y !== t && (undefined !== dt && dt.playing && dt.stop(), dt = new Tween({}, "", Tween.regularEaseInOut, y, t, 1), i = this, dt.onMotionChanged = function(n) {
                    y = n.target._pos, y > et && (et = y), y < ft && (ft = y), y >= ht && !tt ? (tt = !0, wi(tt), ii && bt.play()) : y < ht && (tt = !1, wi(tt), ii && bt.pause()), ri || (ri = !0, h(i.repaint))
                }, dt.start())
            }, this.resetMinMeasuredValue = function() {
                ft = y, this.repaint()
            }, this.resetMaxMeasuredValue = function() {
                et = y, this.repaint()
            }, this.setMinMeasuredValueVisible = function(n) {
                di = n, this.repaint()
            }, this.setMaxMeasuredValueVisible = function(n) {
                gi = n, this.repaint()
            }, this.setThresholdVisible = function(n) {
                vr = n, this.repaint()
            }, this.setLcdDecimals = function(n) {
                lr = n, this.repaint()
            }, this.setFrameDesign = function(n) {
                st({
                    frame: !0
                }), sr = n, rt({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                st({
                    background: !0
                }), d = n, rt({
                    background: !0
                }), this.repaint()
            }, this.setValueColor = function(n) {
                st({
                    foreground: !0
                }), kt = n, rt({
                    foreground: !0
                }), this.repaint()
            }, this.setLedColor = function(n) {
                st({
                    led: !0
                }), ti = n, rt({
                    led: !0
                }), this.repaint()
            }, this.setLcdColor = function(n) {
                st({
                    background: !0
                }), wt = n, rt({
                    background: !0
                }), this.repaint()
            }, this.setMaxMeasuredValue = function(n) {
                var t = n < o ? o : n > s ? s : n;
                et = n, this.repaint()
            }, this.setMinMeasuredValue = function(n) {
                var t = n < o ? o : n > s ? s : n;
                ft = t, this.repaint()
            }, this.setTitleString = function(n) {
                bi = n, st({
                    background: !0
                }), rt({
                    background: !0
                }), this.repaint()
            }, this.setUnitString = function(n) {
                ki = n, st({
                    background: !0
                }), rt({
                    background: !0
                }), this.repaint()
            }, this.setMinValue = function(n) {
                st({
                    background: !0
                }), o = n, ft < o && (ft = o), y < o && (y = o), rt({
                    background: !0
                }), this.repaint()
            }, this.getMinValue = function() {
                return o
            }, this.setMaxValue = function(n) {
                st({
                    background: !0
                }), s = n, et > s && (et = s), y > s && (y = s), rt({
                    background: !0
                }), this.repaint()
            }, this.getMaxValue = function() {
                return s
            }, this.setThreshold = function(n) {
                var t = n < o ? o : n > s ? s : n;
                ht = t, st({
                    background: !0
                }), rt({
                    background: !0
                }), this.repaint()
            }, this.repaint = function() {
                br || rt({
                    frame: !0,
                    background: !0,
                    led: !0,
                    foreground: !0
                }), w.clearRect(0, 0, w.canvas.width, w.canvas.height), hr && w.drawImage(fi, 0, 0), w.drawImage(ei, 0, 0), ci && ou(w, y, l), ar && (y < ht && (tt = !1, ni = pt), w.drawImage(ni, nr, tr));
                var n, t, i, r, f;
                di && (l ? (t = v.type === "type1" ? .856796 : .7475, i = t - .12864, n = u * t - u * i * (ft / (s - o)), r = e * .34 - oi.width, f = n - oi.height / 2) : (t = v.type === "type1" ? .871012 : .82, i = t - (v.type === "type1" ? .142857 : .19857), n = e * i * ft / (s - o), r = e * (v.type === "type1" ? .142857 : .19857) - oi.height / 2 + n, f = u * .65), w.drawImage(oi, r, f)), gi && (l ? (n = u * t - u * i * (et / (s - o)), r = e * .34 - si.width, f = n - si.height / 2) : (t = v.type === "type1" ? .871012 : .8, i = t - (v.type === "type1" ? .14857 : .19857), n = e * i * et / (s - o), r = e * (v.type === "type1" ? .142857 : .19857) - si.height / 2 + n, f = u * .65), w.drawImage(si, r, f)), w.save(), lu(w, e, u), w.restore(), (yr || v.type === "type2") && w.drawImage(hi, 0, 0), ri = !1
            }, this.repaint(), this
        },
        tr = function(n, i) {
            var fi, li, d;
            i = i || {};
            var y = undefined === i.width ? 140 : i.width,
                w = undefined === i.height ? 320 : i.height,
                r = undefined === i.minValue ? 0 : i.minValue,
                o = undefined === i.maxValue ? r + 100 : i.maxValue,
                dt = undefined === i.section ? null : i.section,
                lu = undefined === i.useSectionColors ? !1 : i.useSectionColors,
                au = undefined === i.niceScale ? !0 : i.niceScale,
                st = undefined === i.threshold ? (o - r) / 2 : i.threshold,
                ir = undefined === i.titleString ? "" : i.titleString,
                rr = undefined === i.unitString ? "" : i.unitString,
                wr = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                br = undefined === i.frameVisible ? !0 : i.frameVisible,
                k = undefined === i.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : i.backgroundColor,
                ur = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                ri = undefined === i.valueColor ? steelseries.ColorDef.RED : i.valueColor,
                gt = undefined === i.lcdColor ? steelseries.LcdColor.STANDARD : i.lcdColor,
                pi = undefined === i.lcdVisible ? !0 : i.lcdVisible,
                kr = undefined === i.lcdDecimals ? 2 : i.lcdDecimals,
                vu = undefined === i.digitalFont ? !1 : i.digitalFont,
                ui = undefined === i.ledColor ? steelseries.LedColor.RED_LED : i.ledColor,
                dr = undefined === i.ledVisible ? !0 : i.ledVisible,
                gr = undefined === i.thresholdVisible ? !0 : i.thresholdVisible,
                fr = undefined === i.minMeasuredValueVisible ? !1 : i.minMeasuredValueVisible,
                er = undefined === i.maxMeasuredValueVisible ? !1 : i.maxMeasuredValueVisible,
                yu = undefined === i.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : i.labelNumberFormat,
                nu = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                or = undefined === i.playAlarm ? !1 : i.playAlarm,
                tu = undefined === i.alarmSound ? !1 : i.alarmSound,
                pt = undefined === i.valueGradient ? null : i.valueGradient,
                iu = undefined === i.useValueGradient ? !1 : i.useValueGradient;
            or && tu !== !1 && (fi = f.createElement("audio"), fi.setAttribute("src", tu), fi.setAttribute("preload", "auto"));
            var pu = this,
                l = r,
                ht = o,
                vt = r,
                ni, it = !1,
                ei = !1,
                oi = !1,
                wi = !1,
                ft = [],
                ru = 0,
                v = f.getElementById(n).getContext("2d");
            v.clearRect(0, 0, v.canvas.width, v.canvas.height), v.canvas.width = y, v.canvas.height = w;
            var u = v.canvas.width,
                e = v.canvas.height,
                s = y <= w,
                sr, hr, et = Math.round((s ? w : y) * .05),
                rt = Math.round((s ? y : w) * .05),
                cr, lr;
            s ? (sr = u / 2 - et / 2, hr = .053 * e, cr = Math.floor(e / 22) + "px sans-serif", lr = Math.floor(e / 22) + "px " + ut) : (sr = .89 * u, hr = e / 1.95 - et / 2, cr = Math.floor(e / 10) + "px sans-serif", lr = Math.floor(e / 10) + "px " + ut);
            var uu = !1,
                bi = r,
                ki = o,
                di = o - r,
                fu = ki - bi,
                gi = 0,
                wt = 0,
                si = 10,
                wu = 10,
                bu = function() {
                    au ? (di = a(o - r, !1), wt = a(di / (wu - 1), !0), bi = Math.floor(r / wt) * wt, ki = Math.ceil(o / wt) * wt, gi = a(wt / (si - 1), !0), r = bi, o = ki, fu = o - r) : (di = o - r, bi = r, ki = o, fu = di, gi = 1, wt = 10)
                },
                hi = t(y, w),
                eu = hi.getContext("2d"),
                ci = t(y, w),
                nt = ci.getContext("2d"),
                nr, tt = f.createElement("canvas");
            s ? (tt.width = u * .121428, tt.height = e * .012135) : (tt.width = u * .012135, tt.height = e * .121428), li = tt.getContext("2d"), d = f.createElement("canvas"), s ? (d.width = u * .121428, d.height = e * .012135) : (d.width = u * .012135, d.height = e * .121428);
            var ou = d.getContext("2d"),
                ti = t(et, et),
                ar = ti.getContext("2d"),
                bt = t(et, et),
                vr = bt.getContext("2d"),
                ii = bt,
                ai = t(rt, rt),
                su = ai.getContext("2d"),
                vi = t(rt, rt),
                hu = vi.getContext("2d"),
                yi = t(y, w),
                cu = yi.getContext("2d"),
                ku = function(n, t, i) {
                    n.save(), n.textAlign = "right", n.textBaseline = "middle", n.strokeStyle = gt.textColor, n.fillStyle = gt.textColor, (gt === steelseries.LcdColor.STANDARD || gt === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", i ? (n.shadowOffsetX = u * .007, n.shadowOffsetY = u * .007, n.shadowBlur = u * .009) : (n.shadowOffsetX = e * .007, n.shadowOffsetY = e * .007, n.shadowBlur = e * .009));
                    var r, f, o;
                    n.font = vu ? lr : cr, i ? (r = (u - u * .571428) / 2 + 1 + u * .571428 - 2, f = e * .88 + 1 + (e * .055 - 2) / 2, o = u * .7 - 2) : (r = u * .695 + u * .18 - 2, f = e * .22 + 1 + (e * .15 - 2) / 2, o = e * .22 - 2), n.fillText(t.toFixed(kr), r, f, o), n.restore()
                },
                du = function(n) {
                    var i = f.createElement("canvas"),
                        t, r;
                    return i.height = i.width = rt, t = i.getContext("2d"), t.save(), r = t.createLinearGradient(0, .1, 0, i.height * .9), r.addColorStop(0, "#520000"), r.addColorStop(.3, "#fc1d00"), r.addColorStop(.59, "#fc1d00"), r.addColorStop(1, "#520000"), t.fillStyle = r, n ? (t.beginPath(), t.moveTo(.1, i.height * .5), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .9, i.height * .9), t.closePath()) : (t.beginPath(), t.moveTo(.1, .1), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .5, i.height * .9), t.closePath()), t.fill(), t.strokeStyle = "#FFFFFF", t.stroke(), t.restore(), i
                },
                gu = function(n, t, i) {
                    var s, rt;
                    k.labelColor.setAlpha(1), n.save(), n.textBaseline = "middle", s = u * .1, n.strokeStyle = k.labelColor.getRgbaColor(), n.fillStyle = k.labelColor.getRgbaColor();
                    var h = r,
                        c = si - 1,
                        l, f, y, p, w, a, v = 1,
                        b, d, g, nt, tt, it;
                    for (i ? (b = .34 * u, d = .36 * u, g = .33 * u, nt = .36 * u, tt = .32 * u, it = .36 * u, n.textAlign = "right", y = 0, p = e * .12864, w = 0, a = e * .856796 - e * .12864, v = a / (o - r)) : (b = .65 * e, d = .63 * e, g = .66 * e, nt = .63 * e, tt = .67 * e, it = .63 * e, n.textAlign = "center", y = u * .142857, p = 0, w = u * .871012 - u * .142857, a = 0, v = w / (o - r)), rt = r, l = 0; rt <= o; rt += gi, l += gi) {
                        if (f = i ? p + a - l * v : y + l * v, c++, c === si) {
                            if (n.lineWidth = 1.5, yr(n, tt, it, f, i), i) switch (t.format) {
                                case "fractional":
                                    n.fillText(h.toFixed(2), u * .28, f, s);
                                    break;
                                case "scientific":
                                    n.fillText(h.toPrecision(2), u * .28, f, s);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(h.toFixed(0), u * .28, f, s)
                            } else switch (t.format) {
                                case "fractional":
                                    n.fillText(h.toFixed(2), f, e * .73, s);
                                    break;
                                case "scientific":
                                    n.fillText(h.toPrecision(2), f, e * .73, s);
                                    break;
                                case "standard":
                                default:
                                    n.fillText(h.toFixed(0), f, e * .73, s)
                            }
                            h += wt, c = 0;
                            continue
                        }
                        0 == si % 2 && c === si / 2 ? (n.lineWidth = 1, yr(n, g, nt, f, i)) : (n.lineWidth = .5, yr(n, b, d, f, i))
                    }
                    n.restore()
                },
                yr = function(n, t, i, r, u) {
                    u ? (n.beginPath(), n.moveTo(t, r), n.lineTo(i, r), n.closePath(), n.stroke()) : (n.beginPath(), n.moveTo(r, t), n.lineTo(r, i), n.closePath(), n.stroke())
                },
                b = function(n) {
                    var i, t, f, h, l, a;
                    n = n || {};
                    var y = undefined === n.frame ? !1 : n.frame,
                        v = undefined === n.background ? !1 : n.background,
                        w = undefined === n.led ? !1 : n.led,
                        b = undefined === n.foreground ? !1 : n.foreground,
                        d = undefined === n.bargraphled ? !1 : n.bargraphled;
                    if (uu = !0, bu(), y && br && ct(eu, wr, u, e, s), v && ur && lt(nt, k, u, e, s), w && (s ? (ar.drawImage(c(et, 1, ui), 0, 0), vr.drawImage(c(et, 0, ui), 0, 0)) : (ar.drawImage(c(et, 1, ui), 0, 0), vr.drawImage(c(et, 0, ui), 0, 0))), fr && (s ? su.drawImage(p(rt, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, s), 0, 0) : su.drawImage(p(rt, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, s), 0, 0)), er && (s ? hu.drawImage(p(rt, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, s), 0, 0) : hu.drawImage(p(rt, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, s), 0, 0)), v && ur && (gu(nt, yu, s), gr && (nt.save(), s ? (i = e * .856796 - e * .728155 * (st / (o - r)), nt.translate(u * .365, i - rt / 2)) : (i = (u * .856796 - u * .12864) * st / (o - r), nt.translate(u * .142857 - rt / 2 + i, e * .58)), nt.drawImage(du(s), 0, 0), nt.restore()), s ? yt(nt, u, e, ir, rr, k, s, null, pi) : yt(nt, u, e, ir, rr, k, s, null, pi)), v && pi && (s ? (nr = g(u * .571428, e * .055, gt), nt.drawImage(nr, (u - u * .571428) / 2, e * .88)) : (nr = g(u * .18, e * .15, gt), nt.drawImage(nr, u * .695, e * .22))), d && (rf(ou), pr(li, ri)), oi = !1, null !== dt && 0 < dt.length) {
                        oi = !0, t = dt.length, s ? (f = e * .12864, h = e * .856796, l = h - f, a = 0) : (f = u * .856796, h = u * .12864, l = f - h, a = u * .012135 / 2), ft = [];
                        do t--, ft.push({
                            start: (dt[t].start + Math.abs(r)) / (o - r) * l - a,
                            stop: (dt[t].stop + Math.abs(r)) / (o - r) * l - a,
                            color: kt(dt[t].color)
                        }); while (0 < t)
                    }
                    wi = !1, iu && pt !== null && (oi = !1, wi = !0), b && nu && at(cu, u, e, s, !1)
                },
                ot = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.led ? !1 : n.led,
                        u = undefined === n.bargraphled ? !1 : n.bargraphled,
                        f = undefined === n.foreground ? !1 : n.foreground;
                    t && (hi.width = y, hi.height = w, eu = hi.getContext("2d")), i && (ci.width = y, ci.height = w, nt = ci.getContext("2d")), u && (s ? (tt.width = y * .121428, tt.height = w * .012135) : (tt.width = y * .012135, tt.height = w * .121428), li = tt.getContext("2d"), s ? (d.width = y * .121428, d.height = w * .012135) : (d.width = y * .012135, d.height = w * .121428), ou = d.getContext("2d")), r && (ti.width = Math.ceil(y * .093457), ti.height = Math.ceil(w * .093457), ar = ti.getContext("2d"), bt.width = Math.ceil(y * .093457), bt.height = Math.ceil(w * .093457), vr = bt.getContext("2d"), ii = bt), f && (yi.width = y, yi.height = w, cu = yi.getContext("2d"))
                },
                tr = function(n) {
                    n ? ru = setInterval(nf, 1e3) : clearInterval(ru)
                },
                nf = function() {
                    dr && (ii = ii === ti ? bt : ti, ei || (ei = !0, h(pu.repaint)))
                },
                tf = function(n, t, i) {
                    var c, et, f = k.labelColor,
                        u, yt, ti, nt, ot, ht, wt, bt, dt, gt, ni, ct, lt, p, y, it, rt, w, b, g, ut, ii, ui, at, vt, e, h, a, st, v;
                    if (s ? (c = i * .12864, et = i * .856796, u = et - c, yt = u * (l - r) / (o - r), ti = c + u - yt, nt = 0, ot = c, ht = 0, wt = c + u * 1.014) : (c = t * .856796, et = t * .12864, u = c - et, yt = u * (l - r) / (o - r), ti = et, nt = t * .13, ot = i * .435714, ht = nt + u * 1.035, wt = ot), y = k === steelseries.BackgroundColor.CARBON || k === steelseries.BackgroundColor.PUNCHED_SHEET || k === steelseries.BackgroundColor.STAINLESS || k === steelseries.BackgroundColor.BRUSHED_STAINLESS || k === steelseries.BackgroundColor.TURNED ? .3 : 0, it = n.createLinearGradient(nt, ot, ht, wt), f.setAlpha(.047058 + y), it.addColorStop(0, f.getRgbaColor()), f.setAlpha(.145098 + y), it.addColorStop(.48, f.getRgbaColor()), f.setAlpha(.149019 + y), it.addColorStop(.49, f.getRgbaColor()), f.setAlpha(.047058 + y), it.addColorStop(1, f.getRgbaColor()), n.fillStyle = it, s ? n.fillRect(t * .435714, c, t * .15, u * 1.014) : n.fillRect(nt, ot, u * 1.035, i * .152857), s ? (bt = 0, dt = c, gt = 0, ni = c + u * 1.014) : (bt = nt, dt = 0, gt = ht, ni = 0), rt = n.createLinearGradient(bt, dt, gt, ni), f.setAlpha(.298039 + y), rt.addColorStop(0, f.getRgbaColor()), f.setAlpha(.686274 + y), rt.addColorStop(.48, f.getRgbaColor()), f.setAlpha(.698039 + y), rt.addColorStop(.49, f.getRgbaColor()), f.setAlpha(.4 + y), rt.addColorStop(1, f.getRgbaColor()), n.fillStyle = rt, s ? (n.fillRect(t * .435714, c, t * .007142, u * 1.014), n.fillRect(t * .571428, c, t * .007142, u * 1.014)) : (n.fillRect(t * .13, i * .435714, u * 1.035, i * .007142), n.fillRect(t * .13, i * .571428, u * 1.035, i * .007142)), s ? (w = t * .45, b = i * .851941, g = t * .121428, ut = i * .012135, ii = (w + g) / 2, ui = (b + ut) / 2) : (w = t * .142857, b = i * .45, g = t * .012135, ut = i * .121428, ii = (w + g) / 2, ui = (b + ut) / 2), st = ri, s) {
                        for (vt = (o + Math.abs(r)) / (o - r) * u, h = 0; h <= vt; h += ut + 1) n.translate(0, -h), n.drawImage(d, w, b), n.translate(0, h);
                        for (at = (l + Math.abs(r)) / (o - r) * u, h = 0; h <= at; h += ut + 1) {
                            if (a = ri, wi) ct = r + h / u * (o - r), lt = pt.getEnd() - pt.getStart(), p = ct / lt, p = Math.max(Math.min(p, 1), 0), a = kt(pt.getColorAt(p).getRgbaColor());
                            else if (oi)
                                for (v = 0; v < ft.length; v++)
                                    if (h >= ft[v].start && h < ft[v].stop) {
                                        a = ft[v].color;
                                        break
                                    } st.medium.getHexColor() !== a.medium.getHexColor() && (pr(li, a), st = a), n.translate(0, -h), n.drawImage(tt, w, b), n.translate(0, h)
                        }
                    } else {
                        for (vt = (o + Math.abs(r)) / (o - r) * u, e = -(g / 2); e <= vt; e += g + 1) n.translate(e, 0), n.drawImage(d, w, b), n.translate(-e, 0);
                        for (at = (l + Math.abs(r)) / (o - r) * u, e = -(g / 2); e <= at; e += g + 1) {
                            if (a = ri, wi) ct = r + e / u * (o - r), lt = pt.getEnd() - pt.getStart(), p = ct / lt, p = Math.max(Math.min(p, 1), 0), a = kt(pt.getColorAt(p).getRgbaColor());
                            else if (oi)
                                for (v = 0; v < ft.length; v++)
                                    if (e >= ft[v].start && e < ft[v].stop) {
                                        a = ft[v].color;
                                        break
                                    } st.medium.getHexColor() !== a.medium.getHexColor() && (pr(li, a), st = a), n.translate(e, 0), n.drawImage(tt, w, b), n.translate(-e, 0)
                        }
                    }
                },
                rf = function(n) {
                    n.save(), n.beginPath(), n.rect(0, 0, n.canvas.width, n.canvas.height), n.closePath();
                    var i = n.canvas.width / 2,
                        r = n.canvas.height / 2,
                        t = v.createRadialGradient(i, r, 0, i, r, n.canvas.width / 2);
                    t.addColorStop(0, "#3c3c3c"), t.addColorStop(1, "#323232"), n.fillStyle = t, n.fill(), n.restore()
                },
                pr = function(n, t) {
                    var r, u, f, i;
                    n.save(), n.beginPath(), n.rect(0, 0, n.canvas.width, n.canvas.height), n.closePath(), r = n.canvas.width / 2, u = n.canvas.height / 2, f = s ? n.canvas.width / 2 : n.canvas.height / 2, i = v.createRadialGradient(r, u, 0, r, u, f), i.addColorStop(0, t.light.getRgbaColor()), i.addColorStop(1, t.dark.getRgbaColor()), n.fillStyle = i, n.fill(), n.restore()
                };
            return this.setValue = function(n) {
                var t = n < r ? r : n > o ? o : n;
                l !== t && (l = t, l > vt && (vt = l), l < ht && (ht = l), l >= st && !it ? (it = !0, tr(it), or && fi.play()) : l < st && (it = !1, tr(it), or && fi.pause()), this.repaint())
            }, this.getValue = function() {
                return l
            }, this.setValueAnimated = function(n) {
                var t = n < r ? r : n > o ? o : n,
                    i = this;
                l !== t && (undefined !== ni && ni.playing && ni.stop(), ni = new Tween({}, "", Tween.regularEaseInOut, l, t, 1), ni.onMotionChanged = function(n) {
                    l = n.target._pos, l >= st && !it ? (it = !0, tr(it)) : l < st && (it = !1, tr(it)), l > vt && (vt = l), l < ht && (ht = l), ei || (ei = !0, h(i.repaint))
                }, ni.start())
            }, this.resetMinMeasuredValue = function() {
                ht = l, this.repaint()
            }, this.resetMaxMeasuredValue = function() {
                vt = l, this.repaint()
            }, this.setMinMeasuredValueVisible = function(n) {
                fr = n, this.repaint()
            }, this.setMaxMeasuredValueVisible = function(n) {
                er = n, this.repaint()
            }, this.setThresholdVisible = function(n) {
                gr = n, this.repaint()
            }, this.setLcdDecimals = function(n) {
                kr = n, this.repaint()
            }, this.setFrameDesign = function(n) {
                ot({
                    frame: !0
                }), wr = n, b({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                ot({
                    background: !0
                }), k = n, b({
                    background: !0
                }), this.repaint()
            }, this.setValueColor = function(n) {
                ot({
                    bargraphled: !0
                }), ri = n, b({
                    bargraphled: !0
                }), this.repaint()
            }, this.setLedColor = function(n) {
                ot({
                    led: !0
                }), ui = n, b({
                    led: !0
                }), this.repaint()
            }, this.setLcdColor = function(n) {
                gt = n, ot({
                    background: !0
                }), b({
                    background: !0
                }), this.repaint()
            }, this.setSection = function(n) {
                dt = n, b(), this.repaint()
            }, this.setSectionActive = function(n) {
                lu = n, b(), this.repaint()
            }, this.setGradient = function(n) {
                pt = n, b(), this.repaint()
            }, this.setGradientActive = function(n) {
                iu = n, b(), this.repaint()
            }, this.setMaxMeasuredValue = function(n) {
                var t = n < r ? r : n > o ? o : n;
                vt !== t && (vt = t, this.repaint())
            }, this.setMinMeasuredValue = function(n) {
                var t = n < r ? r : n > o ? o : n;
                ht !== t && (ht = t, this.repaint())
            }, this.setTitleString = function(n) {
                ir = n, ot({
                    background: !0
                }), b({
                    background: !0
                }), this.repaint()
            }, this.setUnitString = function(n) {
                rr = n, ot({
                    background: !0
                }), b({
                    background: !0
                }), this.repaint()
            }, this.setMinValue = function(n) {
                r = n, ot({
                    background: !0,
                    foreground: !0,
                    pointer: !0
                }), b({
                    background: !0,
                    foreground: !0,
                    pointer: !0
                }), this.repaint()
            }, this.getMinValue = function() {
                return r
            }, this.setMaxValue = function(n) {
                o !== n && (o = n, ot({
                    background: !0,
                    foreground: !0,
                    pointer: !0
                }), b({
                    background: !0,
                    foreground: !0,
                    pointer: !0
                }), this.repaint())
            }, this.getMaxValue = function() {
                return o
            }, this.setThreshold = function(n) {
                var t = n < r ? r : n > o ? o : n;
                st !== t && (st = t, ot({
                    background: !0
                }), b({
                    background: !0
                }), this.repaint())
            }, this.repaint = function() {
                uu || b({
                    frame: !0,
                    background: !0,
                    led: !0,
                    pointer: !0,
                    foreground: !0,
                    bargraphled: !0
                }), v.clearRect(0, 0, v.canvas.width, v.canvas.height), br && v.drawImage(hi, 0, 0), ur && v.drawImage(ci, 0, 0), pi && ku(v, l, s), dr && (l < st && (it = !1, ii = bt), v.drawImage(ii, sr, hr));
                var n, t, i;
                fr && (s ? (n = e * .856796 - e * .728155 * (ht / (o - r)), t = u * .34 - ai.width, i = n - ai.height / 2) : (n = (u * .856796 - u * .12864) * ht / (o - r), t = u * .142857 - ai.height / 2 + n, i = e * .65), v.drawImage(ai, t, i)), er && (s ? (n = e * .856796 - e * .728155 * (vt / (o - r)), t = u * .34 - vi.width, i = n - vi.height / 2) : (n = (u * .856796 - u * .12864) * vt / (o - r), t = u * .142857 - vi.height / 2 + n, i = e * .65), v.drawImage(vi, t, i)), v.save(), tf(v, u, e), v.restore(), nu && v.drawImage(yi, 0, 0), ei = !1
            }, this.repaint(), this
        },
        ir = function(n, i) {
            i = i || {};
            var p = undefined === i.width ? 128 : i.width,
                w = undefined === i.height ? 48 : i.height,
                b = undefined === i.lcdColor ? steelseries.LcdColor.STANDARD : i.lcdColor,
                wt = undefined === i.lcdDecimals ? 2 : i.lcdDecimals,
                it = undefined === i.unitString ? "" : i.unitString,
                rt = undefined === i.unitStringVisible ? !1 : i.unitStringVisible,
                ft = undefined === i.digitalFont ? !1 : i.digitalFont,
                bt = undefined === i.valuesNumeric ? !0 : i.valuesNumeric,
                v = undefined === i.value ? 0 : i.value,
                kt = undefined === i.alwaysScroll ? !1 : i.alwaysScroll,
                et = undefined === i.autoScroll ? !1 : i.autoScroll,
                u = undefined === i.section ? null : i.section,
                c = !1,
                e = 0,
                k, d = !1,
                dt = this,
                r = f.getElementById(n).getContext("2d");
            r.save(), r.clearRect(0, 0, r.canvas.width, r.canvas.height), r.canvas.width = p, r.canvas.height = w;
            var o = p,
                a = w,
                s = 0,
                y = Math.floor(a / 1.5),
                ot = y + "px sans-serif",
                ht = y + "px " + ut,
                ct = !1,
                lt, at = [],
                yt = [],
                gt = function(n, t) {
                    var i, u;
                    r.save(), r.textAlign = "right", r.strokeStyle = t, r.fillStyle = t, r.beginPath(), r.rect(2, 0, o - 4, a), r.closePath(), r.clip(), r.font = ft ? ht : ot, bt ? (i = 0, s = 0, rt && (r.font = Math.floor(a / 2.5) + "px sans-serif", i = r.measureText(it).width), r.font = ft ? ht : ot, u = n.toFixed(wt), s = r.measureText(u).width, r.fillText(u, o - i - 4 - e, a * .5 + y * .38), rt && (r.font = Math.floor(a / 2.5) + "px sans-serif", r.fillText(it, o - 2 - e, a * .5 + y * .38))) : (s = r.measureText(n).width, kt || et && s > o - 4 ? c || (e = s > o * .8 ? o - s - o * .2 : 0, c = !0, clearTimeout(k), k = setTimeout(nt, 200)) : et && s <= o - 4 && (e = 0, c = !1), r.fillText(n, o - 2 - e, a * .5 + y * .38)), r.restore()
                },
                ni = function(n, i, r, u) {
                    var it = t(n, i),
                        f = it.getContext("2d");
                    f.save();
                    var et = 0,
                        h = 0,
                        ot = n,
                        rt = i,
                        ut = Math.min(n, i) * .095,
                        s = f.createLinearGradient(0, h, 0, h + rt);
                    s.addColorStop(0, "#4c4c4c"), s.addColorStop(.08, "#666666"), s.addColorStop(.92, "#666666"), s.addColorStop(1, "#e6e6e6"), f.fillStyle = s, l(f, et, h, ot, rt, ut), f.fill(), f.restore(), f.save();
                    var c = st(r),
                        e = vt(c[0], c[1], c[2]),
                        a = st(u.gradientStartColor),
                        ht = vt(a[0], a[1], a[2]),
                        v = st(u.gradientFraction1Color),
                        ct = vt(v[0], v[1], v[2]),
                        y = st(u.gradientFraction2Color),
                        lt = vt(y[0], y[1], y[2]),
                        p = st(u.gradientFraction3Color),
                        at = vt(p[0], p[1], p[2]),
                        w = st(u.gradientStopColor),
                        yt = vt(w[0], w[1], w[2]),
                        b = pt(e[0], e[1], ht[2] - .31),
                        k = pt(e[0], e[1], ct[2] - .31),
                        d = pt(e[0], e[1], lt[2] - .31),
                        g = pt(e[0], e[1], at[2] - .31),
                        nt = pt(e[0], e[1], yt[2] - .31),
                        wt = 1,
                        tt = 1,
                        bt = n - 2,
                        ft = i - 2,
                        kt = ut - 1,
                        o = f.createLinearGradient(0, tt, 0, tt + ft);
                    return o.addColorStop(0, "rgb(" + b[0] + ", " + b[1] + ", " + b[2] + ")"), o.addColorStop(.03, "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")"), o.addColorStop(.49, "rgb(" + d[0] + "," + d[1] + "," + d[2] + ")"), o.addColorStop(.5, "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")"), o.addColorStop(1, "rgb(" + nt[0] + "," + nt[1] + "," + nt[2] + ")"), f.fillStyle = o, l(f, wt, tt, bt, ft, kt), f.fill(), f.restore(), it
                },
                ti = function(n) {
                    var t = st(n),
                        r = vt(t[0], t[1], t[2]),
                        i = pt(r[0], .57, .83);
                    return "rgb(" + i[0] + ", " + i[1] + ", " + i[2] + ")"
                },
                nt = function() {
                    c ? (e > o && (e = -s), e += 2, k = setTimeout(nt, 50)) : e = 0, d || (d = !0, h(dt.repaint))
                },
                tt = function() {
                    var n;
                    if (ct = !0, lt = g(p, w, b), null !== u && 0 < u.length)
                        for (n = 0; n < u.length; n++) at[n] = ni(p, w, u[n].color, b), yt[n] = ti(u[n].color)
                };
            return this.setValue = function(n) {
                v !== n && (v = n, this.repaint())
            }, this.setLcdColor = function(n) {
                b = n, tt(), this.repaint()
            }, this.setSection = function(n) {
                u = n, tt({
                    background: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setScrolling = function(n) {
                if (n) {
                    if (c) return;
                    c = n, nt()
                } else c = n
            }, this.repaint = function() {
                ct || tt(), r.clearRect(0, 0, r.canvas.width, r.canvas.height);
                var t = lt,
                    i = b.textColor,
                    n;
                if (null !== u && 0 < u.length)
                    for (n = 0; n < u.length; n++)
                        if (v >= u[n].start && v <= u[n].stop) {
                            t = at[n], i = yt[n];
                            break
                        } r.drawImage(t, 0, 0), gt(v, i), d = !1
            }, this.repaint(), this
        },
        rr = function(n, t) {
            t = t || {};
            var h = undefined === t.width ? 128 : t.width,
                c = undefined === t.height ? 64 : t.height,
                u = undefined === t.lcdColor ? steelseries.LcdColor.STANDARD : t.lcdColor,
                l = undefined === t.lcdDecimals ? 2 : t.lcdDecimals,
                a = undefined === t.unitString ? "" : t.unitString,
                v = undefined === t.unitStringVisible ? !1 : t.unitStringVisible,
                y = undefined === t.digitalFont ? !1 : t.digitalFont,
                d = undefined === t.valuesNumeric ? !0 : t.valuesNumeric,
                o = undefined === t.value ? 0 : t.value,
                s = 0,
                i = f.getElementById(n).getContext("2d");
            i.save(), i.clearRect(0, 0, i.canvas.width, i.canvas.height), i.canvas.width = h, i.canvas.height = c;
            var e = h,
                r = c,
                nt = Math.floor(r / 1.875) + "px sans-serif",
                tt = Math.floor(r / 1.875) + "px " + ut,
                p = Math.floor(r / 3.5) + "px sans-serif",
                it = Math.floor(r / 3.5) + "px " + ut,
                w = !1,
                b, rt = function(n) {
                    var t, f, o;
                    i.save(), i.textAlign = "right", i.textBaseline = "middle", i.strokeStyle = u.textColor, i.fillStyle = u.textColor, (u === steelseries.LcdColor.STANDARD || u === steelseries.LcdColor.STANDARD_GREEN) && (i.shadowColor = "gray", i.shadowOffsetX = r * .05, i.shadowOffsetY = r * .05, i.shadowBlur = r * .06), d ? (i.font = Math.floor(r / 2.5) + "px sans-serif", t = 0, v && (i.font = Math.floor(r / 2.5) + "px sans-serif", t = i.measureText(a).width), i.font = y ? tt : nt, f = n.toFixed(l), i.fillText(f, e - t - 4, r * .38), v && (i.font = Math.floor(r / 3) + "px sans-serif", i.fillText(a, e - 2, r * .46)), o = s.toFixed(l), i.font = y ? it : p, i.textAlign = "center", i.fillText(o, e / 2, r * .8)) : (i.font = Math.floor(r / 2.5) + "px sans-serif", i.fillText(n, e - 2, r * .38), i.font = p, i.textAlign = "center", i.fillText(s, e / 2, r * .8)), i.restore()
                },
                k = function() {
                    w = !0, b = g(h, c, u)
                };
            return this.setValue = function(n) {
                (o !== n || s !== n) && (s = o, o = n, this.repaint())
            }, this.setLcdColor = function(n) {
                u = n, k(), this.repaint()
            }, this.repaint = function() {
                w || k(), i.clearRect(0, 0, i.canvas.width, i.canvas.height), i.drawImage(b, 0, 0), rt(o)
            }, this.repaint(), this
        },
        ur = function(n, o) {
            o = o || {};
            var v = undefined === o.size ? 200 : o.size,
                ct = undefined === o.decimalsVisible ? !1 : o.decimalsVisible,
                ri = undefined === o.textOrientationFixed ? !1 : o.textOrientationFixed,
                yt = undefined === o.frameDesign ? steelseries.FrameDesign.METAL : o.frameDesign,
                pt = undefined === o.frameVisible ? !0 : o.frameVisible,
                p = undefined === o.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : o.backgroundColor,
                wt = undefined === o.backgroundVisible ? !0 : o.backgroundVisible,
                nt = undefined === o.pointerColor ? steelseries.ColorDef.RED : o.pointerColor,
                bt = undefined === o.foregroundType ? steelseries.ForegroundType.TYPE1 : o.foregroundType,
                kt = undefined === o.foregroundVisible ? !0 : o.foregroundVisible,
                it, lt = !1,
                c = 0,
                tt = 0,
                y = 0,
                dt = i / 360,
                at = this.value,
                gt = ct ? 1 : 0,
                a = f.getElementById(n).getContext("2d");
            a.save(), a.clearRect(0, 0, a.canvas.width, a.canvas.height), a.canvas.width = v, a.canvas.height = v;
            var s = v,
                l = v,
                w = s / 2,
                g = l / 2,
                ni = !1,
                rt = t(v, v),
                st = rt.getContext("2d"),
                ut = t(v, v),
                vt = ut.getContext("2d"),
                ft = t(v, v),
                ti = ft.getContext("2d"),
                et = t(v, v),
                ii = et.getContext("2d"),
                ui = function(n) {
                    var i, f, t;
                    for (n.textAlign = "center", n.textBaseline = "middle", n.save(), n.strokeStyle = p.labelColor.getRgbaColor(), n.fillStyle = p.labelColor.getRgbaColor(), n.translate(w, g), t = 0; 360 > t; t++) {
                        n.strokeStyle = p.labelColor.getRgbaColor(), n.lineWidth = .5, n.beginPath(), n.moveTo(s * .38, 0), n.lineTo(s * .37, 0), n.closePath(), n.stroke(), 0 == t % 5 && (n.strokeStyle = p.labelColor.getRgbaColor(), n.lineWidth = 1, n.beginPath(), n.moveTo(s * .38, 0), n.lineTo(s * .36, 0), n.closePath(), n.stroke()), 0 == t % 45 && (n.strokeStyle = p.labelColor.getRgbaColor(), n.lineWidth = 1, n.beginPath(), n.moveTo(s * .38, 0), n.lineTo(s * .34, 0), n.closePath(), n.stroke()), 300 < s && (i = "14px sans-serif", f = "12px sans-serif"), 300 >= s && (i = "12px sans-serif", f = "10px sans-serif"), 200 >= s && (i = "10px sans-serif", f = "8px sans-serif"), 100 >= s && (i = "8px sans-serif", f = "6px sans-serif"), n.save();
                        switch (t) {
                            case 0:
                                n.translate(s * .31, 0), n.rotate(t * u + r), n.font = i, n.fillText("0°", 0, 0, s), n.rotate(-(t * u) + r), n.translate(-s * .31, 0), n.translate(s * .41, 0), n.rotate(t * u - r), n.font = f, n.fillText("0%", 0, 0, s);
                                break;
                            case 45:
                                n.translate(s * .31, 0), n.rotate(t * u + .25 * e), n.font = i, n.fillText("45°", 0, 0, s), n.rotate(-(t * u) + .25 * e), n.translate(-s * .31, 0), n.translate(s * .31, s * .085), n.rotate(t * u - .25 * e), n.font = f, n.fillText("100%", 0, 0, s);
                                break;
                            case 90:
                                n.translate(s * .31, 0), n.rotate(t * u), n.font = i, n.fillText("90°", 0, 0, s), n.rotate(-(t * u)), n.translate(-s * .31, 0), n.translate(s * .21, 0), n.rotate(t * u), n.font = f, n.fillText("∞", 0, 0, s);
                                break;
                            case 135:
                                n.translate(s * .31, 0), n.rotate(t * u - .25 * e), n.font = i, n.fillText("45°", 0, 0, s), n.rotate(-(t * u) - .25 * e), n.translate(-s * .31, 0), n.translate(s * .31, -s * .085), n.rotate(t * u + .25 * e), n.font = f, n.fillText("100%", 0, 0, s);
                                break;
                            case 180:
                                n.translate(s * .31, 0), n.rotate(t * u - r), n.font = i, n.fillText("0°", 0, 0, s), n.rotate(-(t * u) - r), n.translate(-s * .31, 0), n.translate(s * .41, 0), n.rotate(t * u + r), n.font = f, n.fillText("0%", 0, 0, s), n.translate(-s * .41, 0);
                                break;
                            case 225:
                                n.translate(s * .31, 0), n.rotate(t * u - .75 * e), n.font = i, n.fillText("45°", 0, 0, s), n.rotate(-(t * u) - .75 * e), n.translate(-s * .31, 0), n.translate(s * .31, s * .085), n.rotate(t * u + .75 * e), n.font = f, n.fillText("100%", 0, 0, s);
                                break;
                            case 270:
                                n.translate(s * .31, 0), n.rotate(t * u - e), n.font = i, n.fillText("90°", 0, 0, s), n.rotate(-(t * u) - e), n.translate(-s * .31, 0), n.translate(s * .21, 0), n.rotate(t * u - e), n.font = f, n.fillText("∞", 0, 0, s);
                                break;
                            case 315:
                                n.translate(s * .31, 0), n.rotate(t * u - 1.25 * e), n.font = i, n.fillText("45°", 0, 0, s), n.rotate(-(t * u) - 1.25 * e), n.translate(-s * .31, 0), n.translate(s * .31, -s * .085), n.rotate(t * u + 1.25 * e), n.font = f, n.fillText("100%", 0, 0, s)
                        }
                        n.restore(), n.rotate(dt)
                    }
                    n.translate(-w, -g), n.restore()
                },
                fi = function(n) {
                    n.save(), n.strokeStyle = p.labelColor.getRgbaColor(), n.fillStyle = p.labelColor.getRgbaColor(), n.save(), n.beginPath(), n.moveTo(s * .200934, l * .434579), n.lineTo(s * .163551, l * .434579), n.lineTo(s * .163551, l * .560747), n.lineTo(s * .200934, l * .560747), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.stroke(), n.save(), n.beginPath(), n.moveTo(s * .163551, l * .471962), n.lineTo(s * .205607, l * .5), n.lineTo(s * .163551, l * .523364), n.lineTo(s * .163551, l * .471962), n.closePath(), n.fill(), n.save(), n.beginPath(), n.moveTo(s * .799065, l * .434579), n.lineTo(s * .836448, l * .434579), n.lineTo(s * .836448, l * .560747), n.lineTo(s * .799065, l * .560747), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.stroke(), n.save(), n.beginPath(), n.moveTo(s * .836448, l * .471962), n.lineTo(s * .794392, l * .5), n.lineTo(s * .836448, l * .523364), n.lineTo(s * .836448, l * .471962), n.closePath(), n.fill(), n.restore()
                },
                ei = function(n) {
                    var u;
                    n.save(), n.save(), n.beginPath(), n.moveTo(s * .523364, l * .350467), n.lineTo(s * .5, l * .130841), n.lineTo(s * .476635, l * .350467), n.bezierCurveTo(s * .476635, l * .350467, s * .490654, l * .345794, s * .5, l * .345794), n.bezierCurveTo(s * .509345, l * .345794, s * .523364, l * .350467, s * .523364, l * .350467), n.closePath();
                    var t = n.createLinearGradient(0, .154205 * l, 0, .350466 * l),
                        i = nt.dark,
                        r = nt.light;
                    i.setAlpha(.70588), r.setAlpha(.70588), t.addColorStop(0, i.getRgbaColor()), t.addColorStop(.3, r.getRgbaColor()), t.addColorStop(.59, r.getRgbaColor()), t.addColorStop(1, i.getRgbaColor()), n.fillStyle = t, u = nt.light.getRgbaColor(), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.strokeStyle = u, n.fill(), n.stroke(), i.setAlpha(1), r.setAlpha(1), n.restore()
                },
                oi = function(n) {
                    var t, i, r, f, u, e;
                    n.save(), t = nt.dark, i = nt.light, t.setAlpha(.70588), i.setAlpha(.70588), n.save(), n.beginPath(), n.moveTo(s * .285046, l * .514018), n.lineTo(s * .21028, l * .5), n.lineTo(s * .285046, l * .481308), n.bezierCurveTo(s * .285046, l * .481308, s * .280373, l * .490654, s * .280373, l * .495327), n.bezierCurveTo(s * .280373, l * .504672, s * .285046, l * .514018, s * .285046, l * .514018), n.closePath(), r = n.createLinearGradient(.224299 * s, 0, .289719 * s, 0), r.addColorStop(0, t.getRgbaColor()), r.addColorStop(.3, i.getRgbaColor()), r.addColorStop(.59, i.getRgbaColor()), r.addColorStop(1, t.getRgbaColor()), n.fillStyle = r, f = nt.light.getRgbaColor(), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.strokeStyle = f, n.fill(), n.stroke(), n.save(), n.beginPath(), n.moveTo(s * .714953, l * .514018), n.lineTo(s * .789719, l * .5), n.lineTo(s * .714953, l * .481308), n.bezierCurveTo(s * .714953, l * .481308, s * .719626, l * .490654, s * .719626, l * .495327), n.bezierCurveTo(s * .719626, l * .504672, s * .714953, l * .514018, s * .714953, l * .514018), n.closePath(), u = n.createLinearGradient(.7757 * s, 0, .71028 * s, 0), u.addColorStop(0, t.getRgbaColor()), u.addColorStop(.3, i.getRgbaColor()), u.addColorStop(.59, i.getRgbaColor()), u.addColorStop(1, t.getRgbaColor()), n.fillStyle = u, e = nt.light.getRgbaColor(), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.strokeStyle = e, n.fill(), n.stroke(), t.setAlpha(1), i.setAlpha(1), n.restore()
                },
                ot = function() {
                    ni = !0, pt && b(st, yt, w, g, s, l), wt && (d(st, p, w, g, s, l), ui(st)), fi(vt), ei(vt), oi(ti), kt && k(ii, bt, s, l, !1)
                },
                ht = function() {
                    rt.width = v, rt.height = v, st = rt.getContext("2d"), ut.width = v, ut.height = v, vt = ut.getContext("2d"), ft.width = v, ft.height = v, ti = ft.getContext("2d"), et.width = v, et.height = v, ii = et.getContext("2d")
                };
            return this.setValue = function(n) {
                var t;
                t = 0 > n ? 360 + n : n, t = 359.9 < n ? n - 360 : n, c !== t && (c = t, tt = 2 * (Math.abs(c) * 10 % 10), 10 < tt && (tt -= 20), 0 === c && (y = 90), 0 < c && 90 >= c && (y = 90 - c), 90 < c && 180 >= c && (y = c - 90), 180 < c && 270 >= c && (y = 270 - c), 270 < c && 360 >= c && (y = c - 270), 0 > c && c >= -90 && (y = 90 - Math.abs(c)), c < -90 && c >= -180 && (y = Math.abs(c) - 90), c < -180 && c >= -270 && (y = 270 - Math.abs(c)), c < -270 && c >= -360 && (y = Math.abs(c) - 270), this.repaint())
            }, this.getValue = function() {
                return c
            }, this.setValueAnimated = function(n) {
                if (360 - n + c < n - c && (n = 360 - n), c !== n) {
                    undefined !== it && it.playing && it.stop(), it = new Tween({}, "", Tween.regularEaseInOut, c, n, 1);
                    var t = this;
                    it.onMotionChanged = function(n) {
                        c = n.target._pos, tt = 2 * (Math.abs(c) * 10 % 10), 10 < tt && (tt -= 20), 0 === c && (y = 90), 0 < c && 90 >= c && (y = 90 - c), 90 < c && 180 >= c && (y = c - 90), 180 < c && 270 >= c && (y = 270 - c), 270 < c && 360 >= c && (y = c - 270), 0 > c && c >= -90 && (y = 90 - Math.abs(c)), c < -90 && c >= -180 && (y = Math.abs(c) - 90), c < -180 && c >= -270 && (y = 270 - Math.abs(c)), c < -270 && c >= -360 && (y = Math.abs(c) - 270), lt || (lt = !0, h(t.repaint))
                    }, it.start()
                }
            }, this.setFrameDesign = function(n) {
                ht(), yt = n, ot(), this.repaint()
            }, this.setBackgroundColor = function(n) {
                ht(), p = n, ot(), this.repaint()
            }, this.setForegroundType = function(n) {
                ht(), bt = n, ot(), this.repaint()
            }, this.setPointerColor = function(n) {
                ht(), nt = n, ot(), this.repaint()
            }, this.repaint = function() {
                ni || ot(), a.save(), a.clearRect(0, 0, a.canvas.width, a.canvas.height), (pt || wt) && a.drawImage(rt, 0, 0), at = r + c * dt - r, a.save(), a.translate(w, g), a.rotate(at), a.translate(-w, -g), a.drawImage(ut, 0, 0), a.fillStyle = p.labelColor.getRgbaColor(), a.textAlign = "center", a.textBaseline = "middle", ri ? (a.restore(), a.font = ct ? s * .1 + "px sans-serif" : s * .15 + "px sans-serif", a.fillText(y.toFixed(gt) + "°", w, g, s * .35)) : (a.font = ct ? s * .15 + "px sans-serif" : s * .2 + "px sans-serif", a.fillText(y.toFixed(gt) + "°", w, g, s * .35), a.restore()), a.translate(w, g), a.rotate(at + tt * u), a.translate(-w, -g), a.drawImage(ft, 0, 0), a.restore(), kt && a.drawImage(et, 0, 0), a.restore(), lt = !1
            }, this.repaint(), this
        },
        fr = function(n, i) {
            i = i || {};
            var c = undefined === i.size ? 200 : i.size,
                ht = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                ct = undefined === i.frameVisible ? !0 : i.frameVisible,
                g = undefined === i.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : i.backgroundColor,
                lt = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                at = undefined === i.pointerType ? steelseries.PointerType.TYPE2 : i.pointerType,
                l = undefined === i.pointerColor ? steelseries.ColorDef.RED : i.pointerColor,
                ni = undefined === i.knobType ? steelseries.KnobType.STANDARD_KNOB : i.knobType,
                ti = undefined === i.knobStyle ? steelseries.KnobStyle.SILVER : i.knobStyle,
                vt = undefined === i.foregroundType ? steelseries.ForegroundType.TYPE1 : i.foregroundType,
                yt = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                a = undefined === i.pointSymbols ? ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] : i.pointSymbols,
                ii = undefined === i.customLayer ? null : i.customLayer,
                ri = undefined === i.degreeScale ? !1 : i.degreeScale,
                pt = undefined === i.roseVisible ? !0 : i.roseVisible,
                nt, st = !1,
                v = 0,
                et = u,
                wt = this.value,
                s = f.getElementById(n).getContext("2d");
            s.save(), s.clearRect(0, 0, s.canvas.width, s.canvas.height), s.canvas.width = c, s.canvas.height = c;
            var e = c,
                o = c,
                y = e / 2,
                p = o / 2,
                bt = e * .006,
                kt = !1,
                rt = t(c, c),
                tt = rt.getContext("2d"),
                ut = t(c, c),
                dt = ut.getContext("2d"),
                ft = t(c, c),
                gt = ft.getContext("2d"),
                ui = function(n) {
                    var i, u, t, f;
                    if (n.textAlign = "center", n.textBaseline = "middle", n.save(), n.strokeStyle = g.labelColor.getRgbaColor(), n.fillStyle = g.labelColor.getRgbaColor(), n.translate(y, p), ri)
                        for (i = .08 * e + "px serif", u = e * .033 + "px serif", n.rotate(et * 10), t = 10; 360 >= t; t += 10) {
                            n.save();
                            switch (t) {
                                case 360:
                                    n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[2], 0, 0, e), n.translate(-e * .35, 0);
                                    break;
                                case 90:
                                    n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[4], 0, 0, e), n.translate(-e * .35, 0);
                                    break;
                                case 180:
                                    n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[6], 0, 0, e), n.translate(-e * .35, 0);
                                    break;
                                case 270:
                                    n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[0], 0, 0, e), n.translate(-e * .35, 0);
                                    break;
                                default:
                                    f = (t + 90) % 360, n.translate(e * .37, 0), n.rotate(r), n.font = u, n.fillText("0".substring(f >= 100) + f, 0, 0, e), n.translate(-e * .37, 0)
                            }
                            n.restore(), n.rotate(et * 10)
                        } else
                            for (i = .12 * e + "px serif", u = .06 * e + "px serif", t = 0; 360 > t; t += 2.5) {
                                0 == t % 5 && (n.lineWidth = 1, n.beginPath(), n.moveTo(e * .38, 0), n.lineTo(e * .36, 0), n.closePath(), n.stroke()), n.save();
                                switch (t) {
                                    case 0:
                                        n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[2], 0, 0, e), n.translate(-e * .35, 0);
                                        break;
                                    case 45:
                                        n.translate(e * .29, 0), n.rotate(r), n.font = u, n.fillText(a[3], 0, 0, e), n.translate(-e * .29, 0);
                                        break;
                                    case 90:
                                        n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[4], 0, 0, e), n.translate(-e * .35, 0);
                                        break;
                                    case 135:
                                        n.translate(e * .29, 0), n.rotate(r), n.font = u, n.fillText(a[5], 0, 0, e), n.translate(-e * .29, 0);
                                        break;
                                    case 180:
                                        n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[6], 0, 0, e), n.translate(-e * .35, 0);
                                        break;
                                    case 225:
                                        n.translate(e * .29, 0), n.rotate(r), n.font = u, n.fillText(a[7], 0, 0, e), n.translate(-e * .29, 0);
                                        break;
                                    case 270:
                                        n.translate(e * .35, 0), n.rotate(r), n.font = i, n.fillText(a[0], 0, 0, e), n.translate(-e * .35, 0);
                                        break;
                                    case 315:
                                        n.translate(e * .29, 0), n.rotate(r), n.font = u, n.fillText(a[1], 0, 0, e), n.translate(-e * .29, 0)
                                }
                                n.restore(), pt && (0 === t || 22.5 === t || 45 === t || 67.5 === t || 90 === t || 112.5 === t || 135 === t || 157.5 === t || 180 === t || 202.5 === t || 225 === t || 247.5 === t || 270 === t || 292.5 === t || 315 === t || 337.5 === t || 360 === t) && (n.save(), n.beginPath(), t % 45 ? n.moveTo(e * .29, 0) : n.moveTo(e * .38, 0), n.lineTo(e * .1, 0), n.closePath(), n.restore(), n.lineWidth = 1, n.strokeStyle = g.symbolColor.getRgbaColor(), n.stroke()), n.rotate(et * 2.5)
                            }
                    n.translate(-y, -p), n.restore()
                },
                fi = function(n) {
                    var t, i, s, r, u, f, h;
                    n.save();
                    switch (at.type) {
                        case "type2":
                            n.beginPath(), n.moveTo(e * .53271, o * .453271), n.bezierCurveTo(e * .53271, o * .453271, e * .5, o * .149532, e * .5, o * .149532), n.bezierCurveTo(e * .5, o * .149532, e * .467289, o * .453271, e * .467289, o * .453271), n.bezierCurveTo(e * .453271, o * .462616, e * .443925, o * .481308, e * .443925, o * .5), n.bezierCurveTo(e * .443925, o * .5, e * .556074, o * .5, e * .556074, o * .5), n.bezierCurveTo(e * .556074, o * .481308, e * .546728, o * .462616, e * .53271, o * .453271), n.closePath(), t = n.createLinearGradient(.471962 * e, 0, .528036 * e, 0), t.addColorStop(0, l.light.getRgbaColor()), t.addColorStop(.46, l.light.getRgbaColor()), t.addColorStop(.47, l.medium.getRgbaColor()), t.addColorStop(1, l.medium.getRgbaColor()), n.fillStyle = t, n.strokeStyle = l.dark.getRgbaColor(), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.fill(), n.stroke(), n.beginPath(), n.moveTo(e * .467289, o * .546728), n.bezierCurveTo(e * .467289, o * .546728, e * .5, o * .850467, e * .5, o * .850467), n.bezierCurveTo(e * .5, o * .850467, e * .53271, o * .546728, e * .53271, o * .546728), n.bezierCurveTo(e * .546728, o * .537383, e * .556074, o * .518691, e * .556074, o * .5), n.bezierCurveTo(e * .556074, o * .5, e * .443925, o * .5, e * .443925, o * .5), n.bezierCurveTo(e * .443925, o * .518691, e * .453271, o * .537383, e * .467289, o * .546728), n.closePath(), i = n.createLinearGradient(.471962 * e, 0, .528036 * e, 0), i.addColorStop(0, "#e3e5e8"), i.addColorStop(.48, "#e3e5e8"), i.addColorStop(.48, "#abb1b8"), i.addColorStop(1, "#abb1b8"), n.fillStyle = i, s = "#abb1b8", n.strokeStyle = s, n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.fill(), n.stroke();
                            break;
                        case "type3":
                            n.beginPath(), n.moveTo(e * .5, o * .149532), n.bezierCurveTo(e * .5, o * .149532, e * .443925, o * .490654, e * .443925, o * .5), n.bezierCurveTo(e * .443925, o * .53271, e * .467289, o * .556074, e * .5, o * .556074), n.bezierCurveTo(e * .53271, o * .556074, e * .556074, o * .53271, e * .556074, o * .5), n.bezierCurveTo(e * .556074, o * .490654, e * .5, o * .149532, e * .5, o * .149532), n.closePath(), r = n.createLinearGradient(.471962 * e, 0, .528036 * e, 0), r.addColorStop(0, l.light.getRgbaColor()), r.addColorStop(.46, l.light.getRgbaColor()), r.addColorStop(.47, l.medium.getRgbaColor()), r.addColorStop(1, l.medium.getRgbaColor()), n.fillStyle = r, n.strokeStyle = l.dark.getRgbaColor(), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.fill(), n.stroke();
                            break;
                        case "type1:":
                        default:
                            n.beginPath(), n.moveTo(e * .5, o * .495327), n.lineTo(e * .528037, o * .495327), n.lineTo(e * .5, o * .149532), n.lineTo(e * .471962, o * .495327), n.lineTo(e * .5, o * .495327), n.closePath(), u = n.createLinearGradient(.471962 * e, 0, .528036 * e, 0), u.addColorStop(0, l.light.getRgbaColor()), u.addColorStop(.46, l.light.getRgbaColor()), u.addColorStop(.47, l.medium.getRgbaColor()), u.addColorStop(1, l.medium.getRgbaColor()), n.fillStyle = u, n.strokeStyle = l.dark.getRgbaColor(), n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.fill(), n.stroke(), n.beginPath(), n.moveTo(e * .5, o * .504672), n.lineTo(e * .471962, o * .504672), n.lineTo(e * .5, o * .850467), n.lineTo(e * .528037, o * .504672), n.lineTo(e * .5, o * .504672), n.closePath(), f = n.createLinearGradient(.471962 * e, 0, .528036 * e, 0), f.addColorStop(0, "#e3e5e8"), f.addColorStop(.48, "#e3e5e8"), f.addColorStop(.480099, "#abb1b8"), f.addColorStop(1, "#abb1b8"), n.fillStyle = f, h = "#abb1b8", n.strokeStyle = h, n.lineWidth = 1, n.lineCap = "square", n.lineJoin = "miter", n.fill(), n.stroke()
                    }
                    n.restore()
                },
                w = function() {
                    kt = !0, ct && b(tt, ht, y, p, e, o), lt && (d(tt, g, y, p, e, o), ot(tt, ii, y, p, e, o), pt && ci(tt, y, p, e, o, g), ui(tt)), fi(dt, !1), yt && k(gt, vt, e, o, !0, ni, ti)
                },
                it = function() {
                    rt.width = c, rt.height = c, tt = rt.getContext("2d"), ut.width = c, ut.height = c, dt = ut.getContext("2d"), ft.width = c, ft.height = c, gt = ft.getContext("2d")
                };
            return this.setValue = function(n) {
                n = n % 360, v !== n && (v = n, this.repaint())
            }, this.getValue = function() {
                return v
            }, this.setValueAnimated = function(n) {
                var t = n % 360,
                    r = this,
                    i;
                v !== t && (undefined !== nt && nt.playing && nt.stop(), i = si(v, t), nt = new Tween({}, "", Tween.elasticEaseOut, v, v + i, 2), nt.onMotionChanged = function(n) {
                    v = n.target._pos % 360, st || (st = !0, h(r.repaint))
                }, nt.start())
            }, this.setFrameDesign = function(n) {
                it(), ht = n, w(), this.repaint()
            }, this.setBackgroundColor = function(n) {
                it(), g = n, w(), this.repaint()
            }, this.setForegroundType = function(n) {
                it(), vt = n, w(), this.repaint()
            }, this.setPointerColor = function(n) {
                it(), l = n, w(), this.repaint()
            }, this.setPointerType = function(n) {
                it(), at = n, w(), this.repaint()
            }, this.setPointSymbols = function(n) {
                it(), a = n, w(), this.repaint()
            }, this.repaint = function() {
                kt || w(), s.clearRect(0, 0, s.canvas.width, s.canvas.height), (ct || lt) && s.drawImage(rt, 0, 0), wt = r + v * et - r, s.save(), s.translate(y, p), s.rotate(wt), s.translate(-y, -p), s.shadowColor = "rgba(0, 0, 0, 0.8)", s.shadowOffsetX = s.shadowOffsetY = bt, s.shadowBlur = bt * 2, s.drawImage(ut, 0, 0), s.restore(), yt && s.drawImage(ft, 0, 0), s.restore(), st = !1
            }, this.repaint(), this
        },
        er = function(n, e) {
            e = e || {};
            var c = undefined === e.size ? 200 : e.size,
                fi = undefined === e.frameDesign ? steelseries.FrameDesign.METAL : e.frameDesign,
                ei = undefined === e.frameVisible ? !0 : e.frameVisible,
                nt = undefined === e.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : e.backgroundColor,
                oi = undefined === e.backgroundVisible ? !0 : e.backgroundVisible,
                kt = undefined === e.pointerTypeLatest ? steelseries.PointerType.TYPE1 : e.pointerTypeLatest,
                hi = undefined === e.pointerTypeAverage ? steelseries.PointerType.TYPE8 : e.pointerTypeAverage,
                ni = undefined === e.pointerColor ? steelseries.ColorDef.RED : e.pointerColor,
                ti = undefined === e.pointerColorAverage ? steelseries.ColorDef.BLUE : e.pointerColorAverage,
                hr = undefined === e.knobType ? steelseries.KnobType.STANDARD_KNOB : e.knobType,
                cr = undefined === e.knobStyle ? steelseries.KnobStyle.SILVER : e.knobStyle,
                li = undefined === e.foregroundType ? steelseries.ForegroundType.TYPE1 : e.foregroundType,
                ai = undefined === e.foregroundVisible ? !0 : e.foregroundVisible,
                l = undefined === e.pointSymbols ? ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] : e.pointSymbols,
                lr = undefined === e.customLayer ? null : e.customLayer,
                ar = undefined === e.degreeScale ? !0 : e.degreeScale,
                vi = undefined === e.roseVisible ? !1 : e.roseVisible,
                lt = undefined === e.lcdColor ? steelseries.LcdColor.STANDARD : e.lcdColor,
                yi = undefined === e.lcdVisible ? !0 : e.lcdVisible,
                vr = undefined === e.digitalFont ? !1 : e.digitalFont,
                ht = undefined === e.section ? null : e.section,
                ct = undefined === e.area ? null : e.area,
                dt = undefined === e.lcdTitleStrings ? ["Latest", "Average"] : e.lcdTitleStrings,
                pi = undefined === e.titleString ? "" : e.titleString,
                wi = undefined === e.useColorLabels ? !1 : e.useColorLabels,
                st, at, tt = 0,
                it = 0,
                vt = u,
                bi = this.valueLatest,
                ii = this.valueAverage,
                yr = -r,
                ki = i,
                di = 360,
                ft = !1,
                s = f.getElementById(n).getContext("2d");
            s.save(), s.clearRect(0, 0, s.canvas.width, s.canvas.height), s.canvas.width = c, s.canvas.height = c;
            var o = c,
                v = c,
                y = o / 2,
                p = v / 2,
                ri = Math.floor(o / 10),
                pr = ri + "px sans-serif",
                wr = ri + "px " + ut,
                gt = o * .3,
                gi = v * .12,
                nr = (o - gt) / 2,
                tr = v * .32,
                ir = v * .565,
                rr = !1,
                yt = t(c, c),
                rt = yt.getContext("2d"),
                ui, pt = t(c, c),
                ur = pt.getContext("2d"),
                wt = t(c, c),
                fr = wt.getContext("2d"),
                bt = t(c, c),
                er = bt.getContext("2d"),
                or = function(n, t) {
                    s.save(), s.textAlign = "center", s.strokeStyle = lt.textColor, s.fillStyle = lt.textColor, n < 0 && (n += 360), n = "00" + Math.round(n), n = n.substring(n.length, n.length - 3), (lt === steelseries.LcdColor.STANDARD || lt === steelseries.LcdColor.STANDARD_GREEN) && (s.shadowColor = "gray", s.shadowOffsetX = o * .007, s.shadowOffsetY = o * .007, s.shadowBlur = o * .007), s.font = vr ? wr : pr, s.fillText(n + "°", o / 2 + gt * .05, (t ? tr : ir) + gi * .5 + ri * .38, gt * .9), s.restore()
                },
                sr = function(n, t, i, r, u) {
                    n.save(), n.strokeStyle = r, n.fillStyle = r, n.lineWidth = o * .035;
                    var f = ki / di * t,
                        e = f + (i - t) / (di / ki);
                    n.translate(y, p), n.rotate(yr), n.beginPath(), u ? (n.moveTo(0, 0), n.arc(0, 0, o * .365 - n.lineWidth / 2, f, e, !1)) : n.arc(0, 0, o * .365, f, e, !1), u ? (n.moveTo(0, 0), n.fill()) : n.stroke(), n.translate(-y, -p), n.restore()
                },
                br = function(n) {
                    var h = o * .38,
                        c = o * .35,
                        w = o * .36,
                        e = o * .1,
                        a = o * .31,
                        u = o * .36,
                        i, f, t, v, s;
                    if (n.textAlign = "center", n.textBaseline = "middle", n.save(), n.strokeStyle = nt.labelColor.getRgbaColor(), n.fillStyle = nt.labelColor.getRgbaColor(), n.translate(y, p), ar)
                        for (i = Math.floor(.1 * o) + "px serif bold", f = Math.floor(o * .04) + "px sans-serif", n.rotate(vt * 5), t = 5; 360 >= t; t += 5) {
                            n.save();
                            switch (t) {
                                case 360:
                                    n.translate(u, 0), n.rotate(r), n.font = i, n.fillText(l[2], 0, 0, e), n.translate(-u, 0);
                                    break;
                                case 90:
                                    n.translate(u, 0), n.rotate(r), n.font = i, n.fillText(l[4], 0, 0, e), n.translate(-u, 0);
                                    break;
                                case 180:
                                    n.translate(u, 0), n.rotate(r), n.font = i, n.fillText(l[6], 0, 0, e), n.translate(-u, 0);
                                    break;
                                case 270:
                                    n.translate(u, 0), n.rotate(r), n.font = i, n.fillText(l[0], 0, 0, e), n.translate(-u, 0);
                                    break;
                                case 5:
                                case 85:
                                case 95:
                                case 175:
                                case 185:
                                case 265:
                                case 275:
                                case 355:
                                    break;
                                default:
                                    (t + 90) % 20 ? (n.lineWidth = (t + 90) % 5 ? 1.5 : 1, n.beginPath(), n.moveTo(h, 0), v = (t + 90) % 10 ? w : c, n.lineTo(v, 0), n.closePath(), n.stroke()) : (n.lineWidth = 1.5, n.beginPath(), n.moveTo(h, 0), n.lineTo(c, 0), n.closePath(), n.stroke(), s = (t + 90) % 360, n.translate(a, 0), n.rotate(r), n.font = f, n.fillText("0".substring(s >= 100) + s, 0, 0, e), n.translate(-a, 0))
                            }
                            n.restore(), n.rotate(vt * 5)
                        } else
                            for (i = .12 * o + "px serif", f = .06 * o + "px serif", n.lineWidth = 1, n.strokeStyle = nt.symbolColor.getRgbaColor(), t = 0; 360 > t; t += 2.5) {
                                0 == t % 5 && (n.beginPath(), n.moveTo(o * .38, 0), n.lineTo(o * .36, 0), n.closePath(), n.stroke()), n.save();
                                switch (t) {
                                    case 0:
                                        n.translate(o * .35, 0), n.rotate(r), n.font = i, n.fillText(l[2], 0, 0), n.translate(-o * .35, 0);
                                        break;
                                    case 45:
                                        n.translate(o * .29, 0), n.rotate(r), n.font = f, n.fillText(l[3], 0, 0), n.translate(-o * .29, 0);
                                        break;
                                    case 90:
                                        n.translate(o * .35, 0), n.rotate(r), n.font = i, n.fillText(l[4], 0, 0), n.translate(-o * .35, 0);
                                        break;
                                    case 135:
                                        n.translate(o * .29, 0), n.rotate(r), n.font = f, n.fillText(l[5], 0, 0), n.translate(-o * .29, 0);
                                        break;
                                    case 180:
                                        n.translate(o * .35, 0), n.rotate(r), n.font = i, n.fillText(l[6], 0, 0), n.translate(-o * .35, 0);
                                        break;
                                    case 225:
                                        n.translate(o * .29, 0), n.rotate(r), n.font = f, n.fillText(l[7], 0, 0), n.translate(-o * .29, 0);
                                        break;
                                    case 270:
                                        n.translate(o * .35, 0), n.rotate(r), n.font = i, n.fillText(l[0], 0, 0), n.translate(-o * .35, 0);
                                        break;
                                    case 315:
                                        n.translate(o * .29, 0), n.rotate(r), n.font = f, n.fillText(l[1], 0, 0), n.translate(-o * .29, 0)
                                }
                                n.restore(), vi && (0 === t || 22.5 === t || 45 === t || 67.5 === t || 90 === t || 112.5 === t || 135 === t || 157.5 === t || 180 === t || 202.5 === t || 225 === t || 247.5 === t || 270 === t || 292.5 === t || 315 === t || 337.5 === t || 360 === t) && (n.save(), n.beginPath(), t % 45 ? n.moveTo(o * .29, 0) : n.moveTo(o * .38, 0), n.lineTo(o * .1, 0), n.closePath(), n.restore(), n.stroke()), n.rotate(vt * 2.5)
                            }
                    n.translate(-y, -p), n.restore()
                },
                kr = function(n) {
                    dt.length > 0 && (n.save(), n.textAlign = "center", n.textBaseline = "middle", n.fillStyle = wi ? ni.medium.getRgbaColor() : nt.labelColor.getRgbaColor(), n.font = .04 * o + "px sans-serif", n.fillText(dt[0], o / 2, v * .29, o * .3), n.fillStyle = wi ? ti.medium.getRgbaColor() : nt.labelColor.getRgbaColor(), n.fillText(dt[1], o / 2, v * .71, o * .3), pi.length > 0 && (n.fillStyle = nt.labelColor.getRgbaColor(), n.font = .0467 * o + "px sans-serif", n.fillText(pi, o / 2, v * .5, o * .3)))
                },
                a = function(n) {
                    var t, i, u;
                    n = n || {};
                    var r = undefined === n.background ? !1 : n.background,
                        f = undefined === n.pointer ? !1 : n.pointer,
                        e = undefined === n.foreground ? !1 : n.foreground;
                    if (rr = !0, r && ei && b(rt, fi, y, p, o, v), r && oi) {
                        if (d(rt, nt, y, p, o, v), ot(rt, lr, y, p, o, v), null !== ht && 0 < ht.length) {
                            t = ht.length;
                            do t--, sr(rt, ht[t].start, ht[t].stop, ht[t].color, !1); while (0 < t)
                        }
                        if (null !== ct && 0 < ct.length) {
                            i = ct.length;
                            do i--, sr(rt, ct[i].start, ct[i].stop, ct[i].color, !0); while (0 < i)
                        }
                        br(rt)
                    }
                    r && vi && ci(rt, y, p, o, v, nt), r && yi && (ui = g(gt, gi, lt), rt.drawImage(ui, nr, tr), rt.drawImage(ui, nr, ir), kr(rt)), f && (et(fr, o, hi, ti, nt.labelColor), et(ur, o, kt, ni, nt.labelColor)), e && ai && (u = kt.type === "type15" || kt.type === "type16" ? !1 : !0, k(er, li, o, v, u, hr, cr))
                },
                w = function(n) {
                    n = n || {};
                    var t = undefined === n.background ? !1 : n.background,
                        i = undefined === n.pointer ? !1 : n.pointer,
                        r = undefined === n.foreground ? !1 : n.foreground;
                    t && (yt.width = c, yt.height = c, rt = yt.getContext("2d")), i && (pt.width = c, pt.height = c, ur = pt.getContext("2d"), wt.width = c, wt.height = c, fr = wt.getContext("2d")), r && (bt.width = c, bt.height = c, er = bt.getContext("2d"))
                };
            return this.setValueLatest = function(n) {
                n = n === 360 ? 360 : n % 360, tt !== n && (tt = n, this.repaint())
            }, this.getValueLatest = function() {
                return tt
            }, this.setValueAverage = function(n) {
                n = n === 360 ? 360 : n % 360, it !== n && (it = n, this.repaint())
            }, this.getValueAverage = function() {
                return it
            }, this.setValueAnimatedLatest = function(n) {
                var t = n === 360 ? 360 : n % 360,
                    i = this,
                    r;
                tt !== t && (undefined !== st && st.playing && st.stop(), r = si(tt, t), st = new Tween({}, "", Tween.regularEaseInOut, tt, tt + r, 2.5), st.onMotionChanged = function(n) {
                    tt = n.target._pos === 360 ? 360 : n.target._pos % 360, ft || (ft = !0, h(i.repaint))
                }, t === 360 && (st.onMotionFinished = function() {
                    tt = t, ft || (ft = !0, h(i.repaint))
                }), st.start())
            }, this.setValueAnimatedAverage = function(n) {
                var t = n === 360 ? 360 : n % 360,
                    i, r;
                it !== n && (i = this, undefined !== at && at.playing && at.stop(), r = si(it, t), at = new Tween({}, "", Tween.regularEaseInOut, it, it + r, 2.5), at.onMotionChanged = function(n) {
                    it = n.target._pos === 360 ? 360 : n.target._pos % 360, ft || (ft = !0, h(i.repaint))
                }, t === 360 && (st.onMotionFinished = function() {
                    it = t, ft || (ft = !0, h(i.repaint))
                }), at.start())
            }, this.setArea = function(n) {
                ct = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.setSection = function(n) {
                ht = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.setFrameDesign = function(n) {
                fi = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                nt = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                w({
                    foreground: !0
                }), li = n, a({
                    foreground: !0
                }), this.repaint()
            }, this.setPointerColor = function(n) {
                w({
                    pointer: !0
                }), ni = n, a({
                    pointer: !0
                }), this.repaint()
            }, this.setPointerColorAverage = function(n) {
                w({
                    pointer: !0
                }), ti = n, a({
                    pointer: !0
                }), this.repaint()
            }, this.setPointerType = function(n) {
                kt = n, w({
                    pointer: !0,
                    foreground: !0
                }), a({
                    pointer: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setPointerTypeAverage = function(n) {
                hi = n, w({
                    pointer: !0,
                    foreground: !0
                }), a({
                    pointer: !0,
                    foreground: !0
                }), this.repaint()
            }, this.setPointSymbols = function(n) {
                l = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.setLcdColor = function(n) {
                lt = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.setLcdTitleStrings = function(n) {
                dt = n, w({
                    background: !0
                }), a({
                    background: !0
                }), this.repaint()
            }, this.repaint = function() {
                rr || a({
                    frame: !0,
                    background: !0,
                    led: !0,
                    pointer: !0,
                    foreground: !0
                }), s.clearRect(0, 0, s.canvas.width, s.canvas.height), (ei || oi) && s.drawImage(yt, 0, 0), yi && (or(tt, !0), or(it, !1)), ii = it * vt;
                var n = o * .006;
                s.save(), s.translate(y, p), s.rotate(ii), s.translate(-y, -p), s.shadowColor = "rgba(0, 0, 0, 0.8)", s.shadowOffsetX = s.shadowOffsetY = n, s.shadowBlur = n * 2, s.drawImage(wt, 0, 0), bi = tt * vt - ii, s.translate(y, p), s.rotate(bi), s.translate(-y, -p), s.drawImage(pt, 0, 0), s.restore(), ai && s.drawImage(bt, 0, 0), ft = !1
            }, this.repaint(), this
        },
        or = function(n, o) {
            o = o || {};
            var a = undefined === o.size ? 200 : o.size,
                ht = undefined === o.frameDesign ? steelseries.FrameDesign.METAL : o.frameDesign,
                kt = undefined === o.frameVisible ? !0 : o.frameVisible,
                ct = undefined === o.foregroundType ? steelseries.ForegroundType.TYPE1 : o.foregroundType,
                dt = undefined === o.foregroundVisible ? !0 : o.foregroundVisible,
                ft = undefined === o.pointerColor ? steelseries.ColorDef.WHITE : o.pointerColor,
                g, nt, et = !1,
                y = 0,
                v = 0,
                lt = e * a / 360,
                at = 0,
                p = !1,
                l = f.getElementById(n).getContext("2d");
            l.save(), l.clearRect(0, 0, l.canvas.width, l.canvas.height), l.canvas.width = a, l.canvas.height = a;
            var s = a,
                c = a,
                w = s / 2,
                d = c / 2,
                vt = !1,
                rt = t(a, a),
                yt = rt.getContext("2d"),
                tt = t(a, a * e),
                pt = tt.getContext("2d"),
                it = t(a * .037383, a * .056074),
                wt = it.getContext("2d"),
                ut = t(a, a),
                ot = ut.getContext("2d"),
                gt = function(n) {
                    var t, r, i, f, h;
                    n.save(), t = a, r = a * e, n.beginPath(), n.rect(0, 0, t, r), n.closePath(), f = n.createLinearGradient(0, 0, 0, r), f.addColorStop(0, "#7fd5f0"), f.addColorStop(.5, "#7fd5f0"), f.addColorStop(.5, "#3c4439"), f.addColorStop(1, "#3c4439"), n.fillStyle = f, n.fill(), n.lineWidth = 1;
                    var s = r / 72,
                        o = !1,
                        u = 10;
                    for (n.textAlign = "center", n.textBaseline = "middle", h = t * .04, n.font = h + "px sans-serif", n.fillStyle = "#37596e", i = r / 2 - s; i > 0; i -= s) u <= 90 && (o ? (n.fillText(u, (t - t * .2) / 2 - 8, i, t * .375), n.fillText(u, t - (t - t * .2) / 2 + 8, i, t * .375), n.beginPath(), n.moveTo((t - t * .2) / 2, i), n.lineTo(t - (t - t * .2) / 2, i), n.closePath(), u += 10) : (n.beginPath(), n.moveTo((t - t * .1) / 2, i), n.lineTo(t - (t - t * .1) / 2, i), n.closePath()), n.stroke()), o ^= !0;
                    for (o = !1, u = 10, n.strokeStyle = "#FFFFFF", n.lineWidth = 1.5, n.beginPath(), n.moveTo(0, r / 2), n.lineTo(t, r / 2), n.closePath(), n.stroke(), n.fillStyle = "#FFFFFF", n.lineWidth = 1, i = r / 2 + s; i <= r; i += s) u <= 90 && (o ? (n.fillText(-u, (t - t * .2) / 2 - 8, i, t * .375), n.fillText(-u, t - (t - t * .2) / 2 + 8, i, t * .375), n.beginPath(), n.moveTo((t - t * .2) / 2, i), n.lineTo(t - (t - t * .2) / 2, i), n.closePath(), u += 10) : (n.beginPath(), n.moveTo((t - t * .1) / 2, i), n.lineTo(t - (t - t * .1) / 2, i), n.closePath()), n.stroke()), o ^= !0;
                    n.restore()
                },
                ni = function(n) {
                    var i, f, t;
                    for (n.save(), n.fillStyle = ft.light.getRgbaColor(), n.beginPath(), n.moveTo(s * .476635, c * .5), n.bezierCurveTo(s * .476635, c * .514018, s * .485981, c * .523364, s * .5, c * .523364), n.bezierCurveTo(s * .514018, c * .523364, s * .523364, c * .514018, s * .523364, c * .5), n.bezierCurveTo(s * .523364, c * .485981, s * .514018, c * .476635, s * .5, c * .476635), n.bezierCurveTo(s * .485981, c * .476635, s * .476635, c * .485981, s * .476635, c * .5), n.closePath(), n.moveTo(s * .415887, c * .504672), n.lineTo(s * .415887, c * .495327), n.bezierCurveTo(s * .415887, c * .495327, s * .467289, c * .495327, s * .467289, c * .495327), n.bezierCurveTo(s * .471962, c * .481308, s * .481308, c * .471962, s * .495327, c * .467289), n.bezierCurveTo(s * .495327, c * .467289, s * .495327, c * .415887, s * .495327, c * .415887), n.lineTo(s * .504672, c * .415887), n.bezierCurveTo(s * .504672, c * .415887, s * .504672, c * .467289, s * .504672, c * .467289), n.bezierCurveTo(s * .518691, c * .471962, s * .528037, c * .481308, s * .53271, c * .495327), n.bezierCurveTo(s * .53271, c * .495327, s * .584112, c * .495327, s * .584112, c * .495327), n.lineTo(s * .584112, c * .504672), n.bezierCurveTo(s * .584112, c * .504672, s * .53271, c * .504672, s * .53271, c * .504672), n.bezierCurveTo(s * .528037, c * .518691, s * .518691, c * .53271, s * .5, c * .53271), n.bezierCurveTo(s * .481308, c * .53271, s * .471962, c * .518691, s * .467289, c * .504672), n.bezierCurveTo(s * .467289, c * .504672, s * .415887, c * .504672, s * .415887, c * .504672), n.closePath(), n.fill(), i = 5, f = 5 * u, n.translate(w, d), n.rotate(-r), n.translate(-w, -d), t = -90; t <= 90; t += i) t % 45 == 0 || t === 0 ? (n.strokeStyle = ft.medium.getRgbaColor(), n.lineWidth = 2, n.beginPath(), n.moveTo(s * .5, c * .088785), n.lineTo(s * .5, c * .113), n.closePath(), n.stroke()) : t % 15 == 0 ? (n.strokeStyle = "#FFFFFF", n.lineWidth = 1, n.beginPath(), n.moveTo(s * .5, c * .088785), n.lineTo(s * .5, c * .103785), n.closePath(), n.stroke()) : (n.strokeStyle = "#FFFFFF", n.lineWidth = .5, n.beginPath(), n.moveTo(s * .5, c * .088785), n.lineTo(s * .5, c * .093785), n.closePath(), n.stroke()), n.translate(w, d), n.rotate(f, w, d), n.translate(-w, -d);
                    n.restore()
                },
                ti = function(n) {
                    n.save();
                    var t = s * .037383,
                        i = c * .056074;
                    n.beginPath(), n.moveTo(t * .5, 0), n.lineTo(0, i), n.lineTo(t, i), n.closePath(), n.fillStyle = ft.light.getRgbaColor(), n.fill(), n.strokeStyle = ft.medium.getRgbaColor(), n.stroke(), n.restore()
                },
                st = function() {
                    vt = !0, kt && b(yt, ht, w, d, s, c), gt(pt), ti(wt), ni(ot), dt && k(ot, ct, s, c, !0, wi, bi, pi)
                },
                bt = function() {
                    rt.width = a, rt.height = a, yt = rt.getContext("2d"), tt.width = a, tt.height = a * e, pt = tt.getContext("2d"), it.width = a * .037383, it.height = a * .056074, wt = it.getContext("2d"), ut.width = a, ut.height = a, ot = ut.getContext("2d")
                };
            return this.setRoll = function(n) {
                n = n % 360, y !== n && (y = n, this.repaint())
            }, this.getRoll = function() {
                return y
            }, this.setRollAnimated = function(n) {
                var t = this;
                n = n % 360, y !== n && (undefined !== g && g.playing && g.stop(), g = new Tween({}, "", Tween.regularEaseInOut, y, n, 1), g.onMotionChanged = function(n) {
                    y = n.target._pos, et || (et = !0, h(t.repaint))
                }, g.start())
            }, this.setPitch = function(n) {
                n = (n + 180 - at) % 360 - 180, v !== n && (v = n, v > 90 ? (v = 180 - v, p || this.setRoll(y - 180), p = !0) : v < -90 ? (v = -180 - v, p || this.setRoll(y + 180), p = !0) : p = !1, this.repaint())
            }, this.getPitch = function() {
                return v
            }, this.setPitchAnimated = function(n) {
                var t = this;
                v !== n && (undefined !== nt && nt.playing && nt.stop(), nt = new Tween({}, "", Tween.regularEaseInOut, v, n, 1), nt.onMotionChanged = function(n) {
                    v = n.target._pos, v > 90 ? (v = 180 - v, p || this.setRoll(y - 180), p = !0) : v < -90 ? (v = -180 - v, p || this.setRoll(y + 180), p = !0) : p = !1, et || (et = !0, h(t.repaint)), t.setPitch(n.target._pos)
                }, nt.start())
            }, this.setPitchOffset = function(n) {
                at = n, this.repaint()
            }, this.setFrameDesign = function(n) {
                bt(), ht = n, st(), this.repaint()
            }, this.setForegroundType = function(n) {
                bt(), ct = n, st(), this.repaint()
            }, this.repaint = function() {
                vt || st(), l.save(), l.clearRect(0, 0, l.canvas.width, l.canvas.height), l.drawImage(rt, 0, 0), l.save(), l.beginPath(), l.arc(w, d, s * .831775 / 2, 0, i, !0), l.closePath(), l.clip(), l.translate(w, d), l.rotate(-(y * u)), l.translate(-w, 0), l.translate(0, v * lt), l.drawImage(tt, 0, -tt.height / 2), l.translate(0, -(v * lt) - d), l.drawImage(it, s * .5 - it.width / 2, s * .107476), l.restore(), l.drawImage(ut, 0, 0), l.restore()
            }, this.repaint(), this
        },
        sr = function(n, t) {
            var a, u, s, e, h;
            t = t || {};
            var r = undefined === t.size ? 32 : t.size,
                y = undefined === t.ledColor ? steelseries.LedColor.RED_LED : t.ledColor,
                l = !1,
                p = 0,
                i = f.getElementById(n).getContext("2d");
            i.save(), i.clearRect(0, 0, i.canvas.width, i.canvas.height), i.canvas.width = r, i.canvas.height = r, a = !1, u = f.createElement("canvas"), u.width = r, u.height = r, s = u.getContext("2d"), e = f.createElement("canvas"), e.width = r, e.height = r;
            var v = e.getContext("2d"),
                o = e,
                w = function() {
                    a = !0, s.clearRect(0, 0, s.canvas.width, s.canvas.height), s.drawImage(c(r, 1, y), 0, 0), v.clearRect(0, 0, v.canvas.width, v.canvas.height), v.drawImage(c(r, 0, y), 0, 0)
                };
            return this.toggleLed = function() {
                o = o === u ? e : u, h()
            }, this.setLedColor = function(n) {
                y = n, a = !1, h()
            }, this.setLedOnOff = function(n) {
                o = !0 === n ? u : e, h()
            }, this.blink = function(n) {
                n ? l || (p = setInterval(this.toggleLed, 1e3), l = !0) : l && (clearInterval(p), l = !1)
            }, h = function() {
                a || w(), i.save(), i.clearRect(0, 0, i.canvas.width, i.canvas.height), i.drawImage(o, 0, 0), i.restore()
            }, h(), this
        },
        hr = function(n, r) {
            r = r || {};
            var s = undefined === r.size ? 200 : r.size,
                ti = undefined === r.frameDesign ? steelseries.FrameDesign.METAL : r.frameDesign,
                ii = undefined === r.frameVisible ? !0 : r.frameVisible,
                p = undefined === r.pointerType ? steelseries.PointerType.TYPE1 : r.pointerType,
                y = undefined === r.pointerColor ? p === steelseries.PointerType.TYPE1 ? steelseries.ColorDef.GRAY : steelseries.ColorDef.BLACK : r.pointerColor,
                tt = undefined === r.backgroundColor ? p === steelseries.PointerType.TYPE1 ? steelseries.BackgroundColor.ANTHRACITE : steelseries.BackgroundColor.LIGHT_GRAY : r.backgroundColor,
                ri = undefined === r.backgroundVisible ? !0 : r.backgroundVisible,
                ui = undefined === r.foregroundType ? steelseries.ForegroundType.TYPE1 : r.foregroundType,
                fi = undefined === r.foregroundVisible ? !0 : r.foregroundVisible,
                yi = undefined === r.customLayer ? null : r.customLayer,
                nt = undefined === r.isAutomatic ? !0 : r.isAutomatic,
                a = undefined === r.hour ? 11 : r.hour,
                v = undefined === r.minute ? 5 : r.minute,
                w = undefined === r.second ? 0 : r.second,
                ut = undefined === r.secondMovesContinuous ? !1 : r.secondMovesContinuous,
                ft = undefined === r.timeZoneOffsetHour ? 0 : r.timeZoneOffsetHour,
                et = undefined === r.timeZoneOffsetMinute ? 0 : r.timeZoneOffsetMinute,
                st = undefined === r.secondPointerVisible ? !0 : r.secondPointerVisible,
                g = new Date,
                ei, kt, oi, si, it = ut ? 100 : 1e3;
            it = st ? it : 100;
            var pi = this,
                dt = 6,
                o = f.getElementById(n).getContext("2d");
            o.save(), o.clearRect(0, 0, o.canvas.width, o.canvas.height), o.canvas.width = s, o.canvas.height = s;
            var e = s,
                h = s,
                c = e / 2,
                l = h / 2,
                hi = !1,
                ht = t(s, s),
                ci = ht.getContext("2d"),
                ct = t(s, s),
                wt = ct.getContext("2d"),
                lt = t(s, s),
                li = lt.getContext("2d"),
                at = t(s, s),
                ai = at.getContext("2d"),
                vt = t(s, s),
                vi = vt.getContext("2d"),
                yt = t(s, s),
                gt = yt.getContext("2d"),
                wi = function(n, t) {
                    var i, o, s, r, f;
                    r = e * .405, n.save(), n.translate(c, l);
                    switch (t.type) {
                        case "type1":
                            for (o = e * .074766, f = r - o, n.strokeStyle = tt.labelColor.getRgbaColor(), n.lineWidth = e * .014018, i = 0; i < 360; i += 30) n.beginPath(), n.moveTo(r, 0), n.lineTo(f, 0), n.closePath(), n.stroke(), n.rotate(30 * u);
                            for (s = e * .126168, f = r - s, n.lineWidth = e * .03271, i = 0; i < 360; i += 90) n.beginPath(), n.moveTo(r, 0), n.lineTo(f, 0), n.closePath(), n.stroke(), n.rotate(90 * u);
                            break;
                        case "type2":
                        default:
                            for (o = e * .037383, f = r - o, n.strokeStyle = tt.labelColor.getRgbaColor(), n.lineWidth = e * .009345, i = 0; i < 360; i += 6) n.beginPath(), n.moveTo(r, 0), n.lineTo(f, 0), n.closePath(), n.stroke(), n.rotate(6 * u);
                            for (s = e * .084112, f = r - s, n.lineWidth = e * .028037, i = 0; i < 360; i += 30) n.beginPath(), n.moveTo(r, 0), n.lineTo(f, 0), n.closePath(), n.stroke(), n.rotate(30 * u)
                    }
                    n.translate(-c, -l), n.restore()
                },
                bi = function(n, t) {
                    n.save();
                    var i;
                    switch (t.type) {
                        case "type2":
                            n.beginPath(), n.lineWidth = e * .046728, n.moveTo(c, e * .289719), n.lineTo(c, e * .289719 + e * .224299), n.strokeStyle = y.medium.getRgbaColor(), n.closePath(), n.stroke();
                            break;
                        case "type1":
                        default:
                            n.beginPath(), n.moveTo(e * .471962, h * .560747), n.lineTo(e * .471962, h * .214953), n.lineTo(e * .5, h * .182242), n.lineTo(e * .528037, h * .214953), n.lineTo(e * .528037, h * .560747), n.lineTo(e * .471962, h * .560747), n.closePath(), i = n.createLinearGradient(e * .471962, h * .560747, e * .528037, h * .214953), i.addColorStop(1, y.veryLight.getRgbaColor()), i.addColorStop(0, y.light.getRgbaColor()), n.fillStyle = i, n.strokeStyle = y.light.getRgbaColor(), n.fill(), n.stroke()
                    }
                    n.restore()
                },
                ki = function(n, t) {
                    n.save();
                    var i;
                    switch (t.type) {
                        case "type2":
                            n.beginPath(), n.lineWidth = e * .03271, n.moveTo(c, e * .116822), n.lineTo(c, e * .116822 + e * .38785), n.strokeStyle = y.medium.getRgbaColor(), n.closePath(), n.stroke();
                            break;
                        case "type1":
                        default:
                            n.beginPath(), n.moveTo(e * .518691, h * .574766), n.lineTo(e * .523364, h * .135514), n.lineTo(e * .5, h * .107476), n.lineTo(e * .476635, h * .140186), n.lineTo(e * .476635, h * .574766), n.lineTo(e * .518691, h * .574766), n.closePath(), i = n.createLinearGradient(e * .518691, h * .574766, e * .476635, h * .140186), i.addColorStop(1, y.veryLight.getRgbaColor()), i.addColorStop(0, y.light.getRgbaColor()), n.fillStyle = i, n.strokeStyle = y.light.getRgbaColor(), n.fill(), n.stroke()
                    }
                    n.restore()
                },
                di = function(n, t) {
                    n.save();
                    var r;
                    switch (t.type) {
                        case "type2":
                            n.lineWidth = e * .009345, n.beginPath(), n.moveTo(c, e * .09813), n.lineTo(c, e * .09813 + e * .126168), n.closePath(), n.stroke(), n.lineWidth = e * .018691, n.beginPath(), n.moveTo(c, e * .308411), n.lineTo(c, e * .308411 + e * .191588), n.closePath(), n.stroke(), n.lineWidth = e * .016, n.beginPath(), n.arc(c, e * .26, e * .085 / 2, 0, i), n.closePath(), n.stroke();
                            break;
                        case "type1":
                        default:
                            n.beginPath(), n.moveTo(e * .509345, h * .116822), n.lineTo(e * .509345, h * .574766), n.lineTo(e * .490654, h * .574766), n.lineTo(e * .490654, h * .116822), n.lineTo(e * .509345, h * .116822), n.closePath(), r = n.createLinearGradient(e * .509345, h * .116822, e * .490654, h * .574766), r.addColorStop(0, steelseries.ColorDef.RED.light.getRgbaColor()), r.addColorStop(.47, steelseries.ColorDef.RED.medium.getRgbaColor()), r.addColorStop(1, steelseries.ColorDef.RED.dark.getRgbaColor()), n.fillStyle = r, n.strokeStyle = steelseries.ColorDef.RED.dark.getRgbaColor(), n.fill(), n.stroke()
                    }
                    n.restore()
                },
                gi = function(n) {
                    var t;
                    n.beginPath(), n.arc(c, l, e * .045, 0, i), n.closePath(), t = n.createLinearGradient(c - e * .045 / 2, l - e * .045 / 2, c + e * .045 / 2, l + e * .045 / 2), t.addColorStop(0, "#eef0f2"), t.addColorStop(1, "#65696d"), n.fillStyle = t, n.fill()
                },
                nr = function(n, t) {
                    var r;
                    n.save();
                    switch (t.type) {
                        case "type2":
                            n.fillStyle = "#000000", n.beginPath(), n.arc(c, l, e * .088785 / 2, 0, i), n.closePath(), n.fill();
                            break;
                        case "type1":
                        default:
                            r = n.createLinearGradient(c - e * .027 / 2, l - e * .027 / 2, c + e * .027 / 2, l + e * .027 / 2), r.addColorStop(0, "#f3f4f7"), r.addColorStop(.11, "#f3f5f7"), r.addColorStop(.12, "#f1f3f5"), r.addColorStop(.2, "#c0c5cb"), r.addColorStop(.2, "#bec3c9"), r.addColorStop(1, "#bec3c9"), n.fillStyle = r, n.beginPath(), n.arc(c, l, e * .027, 0, i), n.closePath(), n.fill()
                    }
                    n.restore()
                },
                bt = function(n, t, i) {
                    oi = i * dt * u, ei = t * dt * u, kt = (n + t / 60) * dt * 5 * u
                },
                ni = function() {
                    nt ? g = new Date : (g.setHours(a), g.setMinutes(v), g.setSeconds(w)), w = g.getSeconds() + (ut ? g.getMilliseconds() / 1e3 : 0), a = ft !== 0 && et !== 0 ? g.getUTCHours() + ft : g.getHours(), a = a % 12, v = ft !== 0 && et !== 0 ? g.getUTCMinutes() + et : g.getMinutes(), v > 60 && (v -= 60, a++), v < 0 && (v += 60, a--), a = a % 12, bt(a, v, w), nt && (si = setTimeout(ni, it)), pi.repaint()
                },
                rt = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.pointers ? !1 : n.pointers,
                        u = undefined === n.foreground ? !1 : n.foreground;
                    hi = !0, t && ii && b(ci, ti, c, l, e, h), i && ri && (d(wt, tt, c, l, e, h), ot(wt, yi, c, l, e, h), wi(wt, p)), r && (bi(li, p), ki(ai, p), di(vi, p)), u && fi && (nr(gt, p), k(gt, ui, e, h, !1))
                },
                pt = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.pointers ? !1 : n.pointers,
                        u = undefined === n.foreground ? !1 : n.foreground;
                    t && (ht.width = s, ht.height = s, ci = ht.getContext("2d")), i && (ct.width = s, ct.height = s, wt = ct.getContext("2d")), r && (lt.width = s, lt.height = s, li = lt.getContext("2d"), at.width = s, at.height = s, ai = at.getContext("2d"), vt.width = s, vt.height = s, vi = vt.getContext("2d")), u && (yt.width = s, yt.height = s, gt = yt.getContext("2d"))
                };
            return this.getAutomatic = function() {
                return nt
            }, this.setAutomatic = function(n) {
                nt && !n ? (clearTimer(si), nt = n) : !nt && n && (nt = n, ni())
            }, this.getHour = function() {
                return a
            }, this.setHour = function(n) {
                n = n % 12, a !== n && (a = n, bt(a, v, w), this.repaint())
            }, this.getMinute = function() {
                return v
            }, this.setMinute = function(n) {
                n = n % 60, v !== n && (v = n, bt(a, v, w), this.repaint())
            }, this.getSecond = function() {
                return w
            }, this.setSecond = function(n) {
                w = n % 60, w !== n && (w = n, bt(a, v, w), this.repaint())
            }, this.getTimeZoneOffsetHour = function() {
                return ft
            }, this.setTimeZoneOffsetHour = function(n) {
                ft = n, this.repaint()
            }, this.getTimeZoneOffsetMinute = function() {
                return et
            }, this.setTimeZoneOffsetMinute = function(n) {
                et = n, this.repaint()
            }, this.getSecondPointerVisible = function() {
                return st
            }, this.setSecondPointerVisible = function(n) {
                st = n, this.repaint()
            }, this.getSecondMovesContinuous = function() {
                return ut
            }, this.setSecondMovesContinuous = function(n) {
                ut = n, it = ut ? 100 : 1e3, it = st ? it : 100
            }, this.setFrameDesign = function(n) {
                pt({
                    frame: !0
                }), ti = n, rt({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                pt({
                    frame: !0,
                    background: !0
                }), tt = n, rt({
                    frame: !0,
                    background: !0
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                pt({
                    foreground: !0
                }), ui = n, rt({
                    foreground: !0
                }), this.repaint()
            }, this.setPointerType = function(n) {
                pt({
                    background: !0,
                    foreground: !0,
                    pointers: !0
                }), p = n, p.type === "type1" ? (y = steelseries.ColorDef.GRAY, tt = steelseries.BackgroundColor.ANTHRACITE) : (y = steelseries.ColorDef.BLACK, tt = steelseries.BackgroundColor.LIGHT_GRAY), rt({
                    background: !0,
                    foreground: !0,
                    pointers: !0
                }), this.repaint()
            }, this.setPointerColor = function(n) {
                pt({
                    pointers: !0
                }), y = n, rt({
                    pointers: !0
                }), this.repaint()
            }, this.repaint = function() {
                hi || rt({
                    frame: !0,
                    background: !0,
                    pointers: !0,
                    foreground: !0
                }), o.clearRect(0, 0, o.canvas.width, o.canvas.height), ii && o.drawImage(ht, 0, 0), ri && o.drawImage(ct, 0, 0);
                var n = e * .006;
                o.save(), o.translate(c, l), o.rotate(kt), o.translate(-c, -l), o.shadowColor = "rgba(0, 0, 0, 0.8)", o.shadowOffsetX = o.shadowOffsetY = n, o.shadowBlur = n * 2, o.drawImage(lt, 0, 0), o.translate(c, l), o.rotate(ei - kt), o.translate(-c, -l), o.drawImage(at, 0, 0), o.restore(), p.type === "type1" && gi(o), st && (o.save(), o.translate(c, l), o.rotate(oi), o.translate(-c, -l), o.shadowColor = "rgba(0, 0, 0, 0.8)", o.shadowOffsetX = o.shadowOffsetY = n, o.shadowBlur = n * 2, o.drawImage(vt, 0, 0), o.restore()), fi && o.drawImage(yt, 0, 0)
            }, ni(), this
        },
        cr = function(t, i) {
            var s;
            i = i || {};
            var o = undefined === i.size ? 50 : i.size,
                u = undefined === i.value ? 50 : i.value,
                e = o,
                h = Math.ceil(o * .45),
                r = f.getElementById(t).getContext("2d");
            return r.save(), r.clearRect(0, 0, r.canvas.width, r.canvas.height), r.canvas.width = e, r.canvas.height = e, s = function(t, i, r, u) {
                var f, e;
                t.beginPath(), t.moveTo(i * .025, r * .055555), t.lineTo(i * .9, r * .055555), t.lineTo(i * .9, r * .944444), t.lineTo(i * .025, r * .944444), t.lineTo(i * .025, r * .055555), t.closePath(), t.beginPath(), t.moveTo(i * .925, 0), t.lineTo(0, 0), t.lineTo(0, r), t.lineTo(i * .925, r), t.lineTo(i * .925, r * .722222), t.bezierCurveTo(i * .925, r * .722222, i * .975, r * .722222, i * .975, r * .722222), t.bezierCurveTo(i, r * .722222, i, r * .666666, i, r * .666666), t.bezierCurveTo(i, r * .666666, i, r * .333333, i, r * .333333), t.bezierCurveTo(i, r * .333333, i, r * .277777, i * .975, r * .277777), t.bezierCurveTo(i * .975, r * .277777, i * .925, r * .277777, i * .925, r * .277777), t.lineTo(i * .925, 0), t.closePath(), f = t.createLinearGradient(0, 0, 0, r), f.addColorStop(0, "#ffffff"), f.addColorStop(1, "#7e7e7e"), t.fillStyle = f, t.fill(), t.beginPath(), e = Math.max(i * .875 * (u / 100), Math.ceil(i * .01)), t.rect(i * .025, i * .025, e, r * .888888), t.closePath();
                var h = [0, .4, 1],
                    c = [new n(177, 25, 2, 1), new n(219, 167, 21, 1), new n(121, 162, 75, 1)],
                    l = new ti(0, 100, h, c);
                t.fillStyle = l.getColorAt(u / 100).getRgbColor(), t.fill(), t.beginPath(), e = Math.max(e - i * .05, 0), t.rect(i * .05, i * .05, e, r * .777777), t.closePath();
                var a = [new n(198, 39, 5, 1), new n(228, 189, 32, 1), new n(163, 216, 102, 1)],
                    v = [new n(246, 121, 48, 1), new n(246, 244, 157, 1), new n(223, 233, 86, 1)],
                    o = [0, .4, 1],
                    s = new ti(0, 100, o, a),
                    y = new ti(0, 100, o, v);
                f = t.createLinearGradient(i * .05, 0, i * .875, 0), f.addColorStop(0, s.getColorAt(u / 100).getRgbColor()), f.addColorStop(.5, y.getColorAt(u / 100).getRgbColor()), f.addColorStop(1, s.getColorAt(u / 100).getRgbColor()), t.fillStyle = f, t.fill(), t.beginPath(), t.rect(i * .025, i * .025, i * .875, r * .444444), t.closePath(), f = t.createLinearGradient(i * .025, i * .025, i * .875, r * .444444), f.addColorStop(0, "rgba(255, 255, 255, 0)"), f.addColorStop(1, "rgba(255, 255, 255, 0.8)"), t.fillStyle = f, t.fill()
            }, this.setValue = function(n) {
                n = n < 0 ? 0 : n > 100 ? 100 : n, u !== n && (u = n, this.repaint())
            }, this.getValue = function() {
                return u
            }, this.repaint = function() {
                r.clearRect(0, 0, r.canvas.width, r.canvas.height), s(r, e, h, u)
            }, this.repaint(), this
        },
        lr = function(n, r) {
            r = r || {};
            var h = undefined === r.size ? 200 : r.size,
                bt = undefined === r.frameDesign ? steelseries.FrameDesign.METAL : r.frameDesign,
                kt = undefined === r.frameVisible ? !0 : r.frameVisible,
                l = undefined === r.pointerColor ? steelseries.ColorDef.BLACK : r.pointerColor,
                ht = undefined === r.backgroundColor ? steelseries.BackgroundColor.LIGHT_GRAY : r.backgroundColor,
                dt = undefined === r.backgroundVisible ? !0 : r.backgroundVisible,
                gt = undefined === r.foregroundType ? steelseries.ForegroundType.TYPE1 : r.foregroundType,
                ni = undefined === r.foregroundVisible ? !0 : r.foregroundVisible,
                ci = undefined === r.customLayer ? null : r.customLayer,
                vt = 0,
                ct = 0,
                yt, li = 6,
                ai = this,
                lt = 0,
                w = 0,
                ti = 0,
                ii = 0,
                ri = 0,
                a = !1,
                v = !1,
                s = f.getElementById(n).getContext("2d"),
                o = h,
                nt = h,
                c = o / 2,
                y = nt / 2,
                p = .285 * o,
                vi = c - p / 2,
                g = .17 * o,
                ui = !1,
                tt = t(h, h),
                fi = tt.getContext("2d"),
                it = t(h, h),
                rt = it.getContext("2d"),
                ut = t(h, h),
                ei = ut.getContext("2d"),
                ft = t(h, h),
                oi = ft.getContext("2d"),
                et = t(h, h),
                si = et.getContext("2d"),
                hi = function(n, t, r, u, f, o, s) {
                    var ft = u * t,
                        et = ft + "px sans-serif",
                        ot = t * .15,
                        st = .5,
                        g = 1,
                        ct = 1.5,
                        nt = f * t,
                        tt = Math.round(.025 * t),
                        it = Math.round(.035 * t),
                        rt = Math.round(.045 * t),
                        lt = ht.labelColor.getRgbaColor(),
                        ut = ht.labelColor.getRgbaColor(),
                        h = t / 2,
                        c = t * .4,
                        l, y, k, w = 0,
                        d = 0,
                        at = 0,
                        p, a = 0,
                        v = 0,
                        b, vt = -e,
                        yt = i / r;
                    for (n.width = n.height = t, n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = et, b = vt, p = 0; p <= r + 1; b -= yt * .1, p += .1) n.lineWidth = st, a = Math.sin(b), v = Math.cos(b), w % 2 == 0 && (l = [h + (c - tt) * a + o, h + (c - tt) * v + s], y = [h + c * a + o, h + c * v + s], n.strokeStyle = ut, n.beginPath(), n.moveTo(l[0], l[1]), n.lineTo(y[0], y[1]), n.closePath(), n.stroke()), (w === 10 || w === 0) && (n.fillStyle = lt, n.lineWidth = g, y = [h + c * a + o, h + c * v + s], k = [h + (c - nt) * a + o, h + (c - nt) * v + s], d === 5 ? (p !== r && Math.round(p) !== 60 && n.fillText(Math.round(p), k[0], k[1], ot), n.lineWidth = ct, l = [h + (c - rt) * a + o, h + (c - rt) * v + s], d = 0) : (n.lineWidth = g, l = [h + (c - it) * a + o, h + (c - it) * v + s]), n.strokeStyle = ut, n.beginPath(), n.moveTo(l[0], l[1]), n.lineTo(y[0], y[1]), n.closePath(), n.stroke(), w = 0, at++, d++), w++;
                    n.restore()
                },
                yi = function(n) {
                    var t, r;
                    n.save(), n.beginPath(), n.moveTo(o * .509345, o * .457943), n.lineTo(o * .5, o * .102803), n.lineTo(o * .490654, o * .457943), n.bezierCurveTo(o * .490654, o * .457943, o * .490654, o * .457943, o * .490654, o * .457943), n.bezierCurveTo(o * .471962, o * .462616, o * .457943, o * .481308, o * .457943, o * .5), n.bezierCurveTo(o * .457943, o * .518691, o * .471962, o * .537383, o * .490654, o * .542056), n.bezierCurveTo(o * .490654, o * .542056, o * .490654, o * .542056, o * .490654, o * .542056), n.lineTo(o * .490654, o * .621495), n.lineTo(o * .509345, o * .621495), n.lineTo(o * .509345, o * .542056), n.bezierCurveTo(o * .509345, o * .542056, o * .509345, o * .542056, o * .509345, o * .542056), n.bezierCurveTo(o * .528037, o * .537383, o * .542056, o * .518691, o * .542056, o * .5), n.bezierCurveTo(o * .542056, o * .481308, o * .528037, o * .462616, o * .509345, o * .457943), n.bezierCurveTo(o * .509345, o * .457943, o * .509345, o * .457943, o * .509345, o * .457943), n.closePath(), t = n.createLinearGradient(0, 0, 0, o * .621495), t.addColorStop(0, l.medium.getRgbaColor()), t.addColorStop(.388888, l.medium.getRgbaColor()), t.addColorStop(.5, l.light.getRgbaColor()), t.addColorStop(.611111, l.medium.getRgbaColor()), t.addColorStop(1, l.medium.getRgbaColor()), n.fillStyle = t, n.strokeStyle = l.dark.getRgbaColor(), n.fill(), n.stroke(), n.beginPath(), r = o * .06542 / 2, n.arc(c, y, r, 0, i), t = n.createLinearGradient(c - r, c + r, 0, c + r), t.addColorStop(0, "#e6b35c"), t.addColorStop(.01, "#e6b35c"), t.addColorStop(.99, "#c48200"), t.addColorStop(1, "#c48200"), n.fillStyle = t, n.closePath(), n.fill(), n.beginPath(), r = o * .046728 / 2, n.arc(c, y, r, 0, i), t = n.createRadialGradient(c, c, 0, c, c, r), t.addColorStop(0, "#c5c5c5"), t.addColorStop(.19, "#c5c5c5"), t.addColorStop(.22, "#000000"), t.addColorStop(.8, "#000000"), t.addColorStop(.99, "#707070"), t.addColorStop(1, "#707070"), n.fillStyle = t, n.closePath(), n.fill(), n.restore()
                },
                pi = function(n) {
                    var t, r;
                    n.save(), n.beginPath(), n.moveTo(o * .476635, o * .313084), n.bezierCurveTo(o * .476635, o * .322429, o * .485981, o * .331775, o * .495327, o * .336448), n.bezierCurveTo(o * .495327, o * .336448, o * .495327, o * .350467, o * .495327, o * .350467), n.lineTo(o * .504672, o * .350467), n.bezierCurveTo(o * .504672, o * .350467, o * .504672, o * .336448, o * .504672, o * .336448), n.bezierCurveTo(o * .514018, o * .331775, o * .523364, o * .322429, o * .523364, o * .313084), n.bezierCurveTo(o * .523364, o * .303738, o * .514018, o * .294392, o * .504672, o * .289719), n.bezierCurveTo(o * .504672, o * .289719, o * .5, o * .200934, o * .5, o * .200934), n.bezierCurveTo(o * .5, o * .200934, o * .495327, o * .289719, o * .495327, o * .289719), n.bezierCurveTo(o * .485981, o * .294392, o * .476635, o * .303738, o * .476635, o * .313084), n.closePath(), t = n.createLinearGradient(0, 0, o, 0), t.addColorStop(0, l.medium.getRgbaColor()), t.addColorStop(.388888, l.medium.getRgbaColor()), t.addColorStop(.5, l.light.getRgbaColor()), t.addColorStop(.611111, l.medium.getRgbaColor()), t.addColorStop(1, l.medium.getRgbaColor()), n.fillStyle = t, n.strokeStyle = l.dark.getRgbaColor(), n.fill(), n.stroke(), n.beginPath(), r = o * .037383 / 2, n.arc(c, g + p / 2, r, 0, i), n.fillStyle = "#C48200", n.closePath(), n.fill(), n.beginPath(), r = o * .028037 / 2, n.arc(c, g + p / 2, r, 0, i), n.fillStyle = "#999999", n.closePath(), n.fill(), n.beginPath(), r = o * .018691 / 2, n.arc(c, g + p / 2, r, 0, i), n.fillStyle = "#000000", n.closePath(), n.fill(), n.restore()
                },
                pt = function() {
                    w = +new Date - lt, ct = w * li / 1e3, vt = ct % 10800 / 30, ti = w / 6e4 % 30, ii = w / 1e3 % 60, ri = w % 1e3
                },
                st = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.pointers ? !1 : n.pointers,
                        u = undefined === n.foreground ? !1 : n.foreground;
                    ui = !0, t && kt && b(fi, bt, c, y, o, nt), i && dt && (d(rt, ht, c, y, o, nt), ot(rt, ci, c, y, o, nt), hi(rt, o, 60, .075, .1, 0, 0), hi(rt, p, 30, .095, .13, vi, g)), r && (yi(oi), pi(ei)), u && ni && k(si, gt, o, nt, !1)
                },
                at = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.pointers ? !1 : n.pointers,
                        u = undefined === n.foreground ? !1 : n.foreground;
                    t && (tt.width = h, tt.height = h, fi = tt.getContext("2d")), i && (it.width = h, it.height = h, rt = it.getContext("2d")), r && (ut.width = h, ut.height = h, ei = ut.getContext("2d"), ft.width = h, ft.height = h, oi = ft.getContext("2d")), u && (et.width = h, et.height = h, si = et.getContext("2d"))
                },
                wt = function() {
                    v || (pt(), ai.repaint()), a && (yt = setTimeout(wt, 200))
                };
            return this.isRunning = function() {
                return a
            }, this.start = function() {
                a || (a = !0, lt = +new Date - w, wt())
            }, this.stop = function() {
                a && (a = !1, clearTimeout(yt)), v && (v = !1, pt(), this.repaint())
            }, this.reset = function() {
                a && (a = !1, v = !1, clearTimeout(yt)), lt = +new Date, pt(), this.repaint()
            }, this.lap = function() {
                a && !v ? v = !0 : v && (v = !1)
            }, this.getMeasuredTime = function() {
                return ti + ":" + ii + ":" + ri
            }, this.setFrameDesign = function(n) {
                at({
                    frame: !0
                }), bt = n, st({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                at({
                    background: !0
                }), ht = n, st({
                    background: !0
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                at({
                    foreground: !0
                }), gt = n, st({
                    foreground: !0
                }), this.repaint()
            }, this.setPointerColor = function(n) {
                at({
                    pointers: !0
                }), l = n, st({
                    pointers: !0
                }), this.repaint()
            }, this.repaint = function() {
                ui || st({
                    frame: !0,
                    background: !0,
                    pointers: !0,
                    foreground: !0
                }), s.clearRect(0, 0, s.canvas.width, s.canvas.height), kt && s.drawImage(tt, 0, 0), dt && s.drawImage(it, 0, 0);
                var n = o * .006,
                    t = (vt + 2 * Math.sin(vt * u)) * u,
                    i = (ct + 2 * Math.sin(ct * u)) * u;
                s.save(), s.translate(c, g + p / 2), s.rotate(t), s.translate(-c, -(g + p / 2)), s.shadowColor = "rgba(0, 0, 0, 0.8)", s.shadowOffsetX = s.shadowOffsetY = n / 2, s.shadowBlur = n, s.drawImage(ut, 0, 0), s.restore(), s.save(), s.translate(c, y), s.rotate(i), s.translate(-c, -y), s.shadowColor = "rgba(0, 0, 0, 0.8)", s.shadowOffsetX = s.shadowOffsetY = n / 2, s.shadowBlur = n, s.drawImage(ft, 0, 0), s.restore(), ni && s.drawImage(et, 0, 0)
            }, s.save(), s.clearRect(0, 0, s.canvas.width, s.canvas.height), s.canvas.width = h, s.canvas.height = h, lt = +new Date, wt(), this
        },
        ar = function(n, r) {
            function rr() {
                at = i / (ii - y), vt = at / 10, wt = vt / 10
            }

            function ur() {
                ri = v % 1e3 / 100, yt = v % 1e4 / 100, pt = v % 1e5 / 100
            }
            var nt, ct;
            r = r || {};
            var c = undefined === r.size ? 200 : r.size,
                kt = undefined === r.frameDesign ? steelseries.FrameDesign.METAL : r.frameDesign,
                dt = undefined === r.frameVisible ? !0 : r.frameVisible,
                lt = undefined === r.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : r.backgroundColor,
                ai = undefined === r.backgroundVisible ? !0 : r.backgroundVisible,
                vi = undefined === r.knobType ? steelseries.KnobType.METAL_KNOB : r.knobType,
                yi = undefined === r.knobStyle ? steelseries.KnobStyle.BLACK : r.knobStyle,
                p = undefined === r.lcdColor ? steelseries.LcdColor.BLACK : r.lcdColor,
                gt = undefined === r.lcdVisible ? !0 : r.lcdVisible,
                pi = undefined === r.digitalFont ? !1 : r.digitalFont,
                ni = undefined === r.foregroundType ? steelseries.ForegroundType.TYPE1 : r.foregroundType,
                ti = undefined === r.foregroundVisible ? !0 : r.foregroundVisible,
                wi = undefined === r.customLayer ? null : r.customLayer,
                y = 0,
                ii = 10,
                v = y,
                ri = 0,
                yt = 0,
                pt = 0,
                at, vt, wt, bi = 1,
                w, bt = !1,
                u, o, l, a, ui, s = f.getElementById(n).getContext("2d"),
                ki = e,
                fi = !1,
                tt = t(c, c),
                ei = tt.getContext("2d"),
                it = t(c, c),
                rt = it.getContext("2d"),
                oi, ft = t(c, c),
                si = ft.getContext("2d"),
                et = t(c, c),
                hi = et.getContext("2d"),
                st = t(c, c),
                ci = st.getContext("2d"),
                ht = t(c, c),
                li = ht.getContext("2d");
            s.save(), s.clearRect(0, 0, s.canvas.width, s.canvas.height), s.canvas.width = c, s.canvas.height = c, u = c, o = c, l = u / 2, a = o / 2, ui = Math.floor(u * .09) + "px sans-serif";
            var di = function(n) {
                    s.save(), s.textAlign = "right", s.textBaseline = "middle", s.strokeStyle = p.textColor, s.fillStyle = p.textColor, (p === steelseries.LcdColor.STANDARD || p === steelseries.LcdColor.STANDARD_GREEN) && (s.shadowColor = "gray", s.shadowOffsetX = u * .007, s.shadowOffsetY = u * .007, s.shadowBlur = u * .009), s.font = pi ? Math.floor(u * .075) + "px " + ut : Math.floor(u * .075) + "px sans-serif", s.fillText(Math.round(n), (u + u * .4) / 2 - 4, u * .607, u * .4), s.restore()
                },
                gi = function(n, t, i, r, f, e) {
                    var tt = Math.max(u * .012, 2),
                        it = Math.max(u * .007, 1.5),
                        d = u * .13,
                        g = u * .05,
                        nt = u * .07,
                        v = u * .4,
                        w = 0,
                        rt = 0,
                        y = 0,
                        p = 0,
                        k, b, ut = -i - t / 2;
                    for (n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = ui, n.strokeStyle = lt.labelColor.getRgbaColor(), n.fillStyle = lt.labelColor.getRgbaColor(), k = ut, b = 0; b <= 10; k -= e * .1, b += .1) y = Math.sin(k), p = Math.cos(k), w % 2 == 0 && (n.lineWidth = it, n.beginPath(), n.moveTo(l + (v - g) * y, a + (v - g) * p), n.lineTo(l + v * y, a + v * p), n.closePath(), n.stroke()), (w === 10 || w === 0) && (n.lineWidth = tt, t === 0 && Math.round(b) !== ii && n.fillText(Math.round(b).toString(), l + (v - d) * y, a + (v - d) * p), w = 0, rt++, n.beginPath(), n.moveTo(l + (v - nt) * y, a + (v - nt) * p), n.lineTo(l + v * y, a + v * p), n.closePath(), n.stroke()), w++;
                    n.restore()
                },
                nr = function(n, t) {
                    var i;
                    t ? (n.fillStyle = "rgba(0, 0, 0, 0.5)", n.strokeStyle = "rgba(0, 0, 0, 0.5)") : (i = n.createLinearGradient(0, o * .168224, 0, o * .626168), i.addColorStop(0, "#ffffff"), i.addColorStop(.31, "#ffffff"), i.addColorStop(.3101, "#ffffff"), i.addColorStop(.32, "#202020"), i.addColorStop(1, "#202020"), n.fillStyle = i), n.save(), n.beginPath(), n.moveTo(u * .518691, o * .471962), n.bezierCurveTo(u * .514018, o * .471962, u * .509345, o * .467289, u * .509345, o * .467289), n.lineTo(u * .509345, o * .200934), n.lineTo(u * .5, o * .168224), n.lineTo(u * .490654, o * .200934), n.lineTo(u * .490654, o * .467289), n.bezierCurveTo(u * .490654, o * .467289, u * .481308, o * .471962, u * .481308, o * .471962), n.bezierCurveTo(u * .471962, o * .481308, u * .467289, o * .490654, u * .467289, o * .5), n.bezierCurveTo(u * .467289, o * .514018, u * .476635, o * .528037, u * .490654, o * .53271), n.bezierCurveTo(u * .490654, o * .53271, u * .490654, o * .579439, u * .490654, o * .588785), n.bezierCurveTo(u * .485981, o * .593457, u * .481308, o * .59813, u * .481308, o * .607476), n.bezierCurveTo(u * .481308, o * .616822, u * .490654, o * .626168, u * .5, o * .626168), n.bezierCurveTo(u * .509345, o * .626168, u * .518691, o * .616822, u * .518691, o * .607476), n.bezierCurveTo(u * .518691, o * .59813, u * .514018, o * .593457, u * .504672, o * .588785), n.bezierCurveTo(u * .504672, o * .579439, u * .504672, o * .53271, u * .509345, o * .53271), n.bezierCurveTo(u * .523364, o * .528037, u * .53271, o * .514018, u * .53271, o * .5), n.bezierCurveTo(u * .53271, o * .490654, u * .528037, o * .481308, u * .518691, o * .471962), n.closePath(), n.fill(), n.restore()
                },
                tr = function(n) {
                    var t;
                    t = n.createLinearGradient(0, o * .401869, 0, o * .616822), t.addColorStop(0, "#ffffff"), t.addColorStop(.51, "#ffffff"), t.addColorStop(.52, "#ffffff"), t.addColorStop(.5201, "#202020"), t.addColorStop(.53, "#202020"), t.addColorStop(1, "#202020"), n.fillStyle = t, n.beginPath(), n.moveTo(u * .518691, o * .471962), n.bezierCurveTo(u * .514018, o * .462616, u * .528037, o * .401869, u * .528037, o * .401869), n.lineTo(u * .5, o * .331775), n.lineTo(u * .471962, o * .401869), n.bezierCurveTo(u * .471962, o * .401869, u * .485981, o * .462616, u * .481308, o * .471962), n.bezierCurveTo(u * .471962, o * .481308, u * .467289, o * .490654, u * .467289, o * .5), n.bezierCurveTo(u * .467289, o * .514018, u * .476635, o * .528037, u * .490654, o * .53271), n.bezierCurveTo(u * .490654, o * .53271, u * .462616, o * .574766, u * .462616, o * .593457), n.bezierCurveTo(u * .467289, o * .616822, u * .5, o * .612149, u * .5, o * .612149), n.bezierCurveTo(u * .5, o * .612149, u * .53271, o * .616822, u * .537383, o * .593457), n.bezierCurveTo(u * .537383, o * .574766, u * .509345, o * .53271, u * .509345, o * .53271), n.bezierCurveTo(u * .523364, o * .528037, u * .53271, o * .514018, u * .53271, o * .5), n.bezierCurveTo(u * .53271, o * .490654, u * .528037, o * .481308, u * .518691, o * .471962), n.closePath(), n.fill(), n.restore()
                },
                ir = function(n) {
                    n.fillStyle = "#ffffff", n.beginPath(), n.moveTo(u * .518691, o * .471962), n.bezierCurveTo(u * .514018, o * .471962, u * .514018, o * .467289, u * .514018, o * .467289), n.lineTo(u * .514018, o * .317757), n.lineTo(u * .504672, o * .303738), n.lineTo(u * .504672, o * .182242), n.lineTo(u * .53271, o * .116822), n.lineTo(u * .462616, o * .116822), n.lineTo(u * .495327, o * .182242), n.lineTo(u * .495327, o * .299065), n.lineTo(u * .485981, o * .317757), n.lineTo(u * .485981, o * .467289), n.bezierCurveTo(u * .485981, o * .467289, u * .485981, o * .471962, u * .481308, o * .471962), n.bezierCurveTo(u * .471962, o * .481308, u * .467289, o * .490654, u * .467289, o * .5), n.bezierCurveTo(u * .467289, o * .518691, u * .481308, o * .53271, u * .5, o * .53271), n.bezierCurveTo(u * .518691, o * .53271, u * .53271, o * .518691, u * .53271, o * .5), n.bezierCurveTo(u * .53271, o * .490654, u * .528037, o * .481308, u * .518691, o * .471962), n.closePath(), n.fill()
                };
            return nt = function(n) {
                n = n || {};
                var i = undefined === n.frame ? !1 : n.frame,
                    t = undefined === n.background ? !1 : n.background,
                    r = undefined === n.pointers ? !1 : n.pointers,
                    f = undefined === n.foreground ? !1 : n.foreground;
                fi = !0, rr(), i && dt && b(ei, kt, l, a, u, o), t && ai && (d(rt, lt, l, a, u, o), ot(rt, wi, l, a, u, o), gi(rt, 0, ki, 0, 10, at, bi, 0, !0, !0, null)), t && gt && (oi = g(u * .4, o * .09, p), rt.drawImage(oi, (u - u * .4) / 2, o * .56)), r && (nr(ci, !1), tr(hi, !1), ir(si, !1)), f && ti && k(li, ni, u, o, !0, vi, yi)
            }, ct = function(n) {
                n = n || {};
                var t = undefined === n.frame ? !1 : n.frame,
                    i = undefined === n.background ? !1 : n.background,
                    r = undefined === n.pointers ? !1 : n.pointers,
                    u = undefined === n.foreground ? !1 : n.foreground;
                t && (tt.width = c, tt.height = c, ei = tt.getContext("2d")), i && (it.width = c, it.height = c, rt = it.getContext("2d")), r && (st.width = c, st.height = c, ci = st.getContext("2d"), et.width = c, et.height = c, hi = et.getContext("2d"), ft.width = c, ft.height = c, si = ft.getContext("2d")), u && (ht.width = c, ht.height = c, li = ht.getContext("2d"))
            }, this.setValue = function(n) {
                v = n, this.repaint()
            }, this.getValue = function() {
                return v
            }, this.setValueAnimated = function(n) {
                var t = n < y ? y : n,
                    r = this,
                    i;
                v !== t && (undefined !== w && w.playing && w.stop(), i = Math.max(Math.abs(v - t) / 2e3, 1), w = new Tween({}, "", Tween.regularEaseInOut, v, t, i), w.onMotionChanged = function(n) {
                    v = n.target._pos, bt || (bt = !0, h(r.repaint))
                }, w.start())
            }, this.setFrameDesign = function(n) {
                ct({
                    frame: !0
                }), kt = n, nt({
                    frame: !0
                }), this.repaint()
            }, this.setBackgroundColor = function(n) {
                ct({
                    background: !0,
                    pointer: !0
                }), lt = n, nt({
                    background: !0,
                    pointer: !0
                }), this.repaint()
            }, this.setForegroundType = function(n) {
                ct({
                    foreground: !0
                }), ni = n, nt({
                    foreground: !0
                }), this.repaint()
            }, this.setLcdColor = function(n) {
                p = n, ct({
                    background: !0
                }), nt({
                    background: !0
                }), this.repaint()
            }, this.repaint = function() {
                fi || nt({
                    frame: !0,
                    background: !0,
                    led: !0,
                    pointers: !0,
                    foreground: !0
                }), s.clearRect(0, 0, s.canvas.width, s.canvas.height), dt && s.drawImage(tt, 0, 0), s.drawImage(it, 0, 0), gt && di(v), ur();
                var n = u * .006 * .5;
                s.save(), s.translate(l, a), s.rotate((pt - y) * wt), s.translate(-l, -a), s.shadowColor = "rgba(0, 0, 0, 0.8)", s.shadowOffsetX = s.shadowOffsetY = n, s.shadowBlur = n * 2, s.drawImage(ft, 0, 0), n = u * .006 * .75, s.shadowOffsetX = s.shadowOffsetY = n, s.translate(l, a), s.rotate((yt - y) * vt - (pt - y) * wt), s.translate(-l, -a), s.drawImage(et, 0, 0), n = u * .006, s.shadowOffsetX = s.shadowOffsetY = n, s.translate(l, a), s.rotate((ri - y) * at - (yt - y) * vt), s.translate(-l, -a), s.drawImage(st, 0, 0), s.restore(), ti && s.drawImage(ht, 0, 0), bt = !1
            }, this.repaint(), this
        },
        vr = function(n, t) {
            function ui(n, t, i) {
                var r = f.createElement("canvas");
                return r.width = n, r.height = t, i(r.getContext("2d")), r
            }
            var b, ut;
            t = t || {};
            var k = undefined === t.width ? 98 : t.width,
                d = undefined === t.height ? 278 : t.height,
                e, g, r, u, nt = !1,
                tt = !1,
                it = !1,
                rt = !1,
                o = f.createElement("canvas"),
                ft = o.getContext("2d"),
                s = f.createElement("canvas"),
                et = s.getContext("2d"),
                h = f.createElement("canvas"),
                ot = h.getContext("2d"),
                c = f.createElement("canvas"),
                st = c.getContext("2d"),
                l = f.createElement("canvas"),
                ht = l.getContext("2d"),
                a = f.createElement("canvas"),
                ct = a.getContext("2d"),
                v = f.createElement("canvas"),
                lt = v.getContext("2d"),
                y = f.createElement("canvas"),
                at = y.getContext("2d"),
                p = f.createElement("canvas"),
                vt = p.getContext("2d"),
                w = f.createElement("canvas"),
                yt = w.getContext("2d");
            e = f.getElementById(n).getContext("2d"), e.save(), e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.canvas.width = k, e.canvas.height = d, g = k < d * .352517 ? k * 2.836734 : d, r = g * .352517, u = g, o.width = r, o.height = u, s.width = r, s.height = u, h.width = r, h.height = u, c.width = r, c.height = u, l.width = r, l.height = u, a.width = r, a.height = u, v.width = r, v.height = u, y.width = r, y.height = u, p.width = r, p.height = u, w.width = r, w.height = u;
            var pt = function(n) {
                    var i, t;
                    n.save(), n.save(), n.beginPath(), n.moveTo(.107142 * r, 0), n.lineTo(r - .107142 * r, 0), n.quadraticCurveTo(r, 0, r, .107142 * r), n.lineTo(r, u - .107142 * r), n.quadraticCurveTo(r, u, r - .107142 * r, u), n.lineTo(.107142 * r, u), n.quadraticCurveTo(0, u, 0, u - .107142 * r), n.lineTo(0, .107142 * r), n.quadraticCurveTo(0, 0, .107142 * r, u), n.closePath(), i = n.createLinearGradient(.040816 * r, .007194 * u, .952101 * r, .995882 * u), i.addColorStop(0, "rgb(152, 152, 154)"), i.addColorStop(.01, "rgb(152, 152, 154)"), i.addColorStop(.09, "#333333"), i.addColorStop(.24, "rgb(152, 152, 154)"), i.addColorStop(.55, "rgb(31, 31, 31)"), i.addColorStop(.78, "#363636"), i.addColorStop(.98, "#000000"), i.addColorStop(1, "#000000"), n.fillStyle = i, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(.030612 * r + .084183 * r, .010791 * u), n.lineTo(.030612 * r + .938775 * r - .084183 * r, .010791 * u), n.quadraticCurveTo(.030612 * r + .938775 * r, .010791 * u, .030612 * r + .938775 * r, .010791 * u + .084183 * r), n.lineTo(.030612 * r + .938775 * r, .010791 * u + .978417 * u - .084183 * r), n.quadraticCurveTo(.030612 * r + .938775 * r, .010791 * u + .978417 * u, .030612 * r + .938775 * r - .084183 * r, .010791 * u + .978417 * u), n.lineTo(.030612 * r + .084183 * r, .010791 * u + .978417 * u), n.quadraticCurveTo(.030612 * r, .010791 * u + .978417 * u, .030612 * r, .010791 * u + .978417 * u - .084183 * r), n.lineTo(.030612 * r, .010791 * u + .084183 * r), n.quadraticCurveTo(.030612 * r, .010791 * u, .030612 * r + .084183 * r, .010791 * u), n.closePath(), t = n.createLinearGradient(-.132653 * r, -.053956 * u, 2.061408 * r, .667293 * u), t.addColorStop(0, "#000000"), t.addColorStop(.01, "#000000"), t.addColorStop(.16, "#373735"), t.addColorStop(.31, "#000000"), t.addColorStop(.44, "#303030"), t.addColorStop(.65, "#000000"), t.addColorStop(.87, "#363636"), t.addColorStop(.98, "#000000"), t.addColorStop(1, "#000000"), n.fillStyle = t, n.fill(), n.restore(), n.restore()
                },
                wt = function(n) {
                    var t, f, e, o;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .805755 * u, .397959 * r, 0, i, !1), t = n.createLinearGradient(0, .665467 * u, 0, .946043 * u), t.addColorStop(0, "#ffffff"), t.addColorStop(.05, "rgb(204, 204, 204)"), t.addColorStop(.1, "rgb(153, 153, 153)"), t.addColorStop(.17, "#666666"), t.addColorStop(.27, "#333333"), t.addColorStop(1, "#010101"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.scale(1.083333, 1), n.beginPath(), n.arc(.461538 * r, .816546 * u, .367346 * r, 0, i, !1), f = n.createLinearGradient(0, .68705 * u, 0, .946043 * u), f.addColorStop(0, "#000000"), f.addColorStop(.35, "#040404"), f.addColorStop(.66, "#000000"), f.addColorStop(1, "#010101"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .809352 * u, .357142 * r, 0, i, !1), e = n.createRadialGradient(.5 * r, .809352 * u, 0, .5 * r, .809352 * u, .362244 * r), e.addColorStop(0, "#000000"), e.addColorStop(.88, "#000000"), e.addColorStop(.95, "rgb(94, 94, 94)"), e.addColorStop(1, "#010101"), n.fillStyle = e, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .809352 * u, .357142 * r, 0, i, !1), o = n.createLinearGradient(0, .68705 * u, 0, .917266 * u), o.addColorStop(0, "#000000"), o.addColorStop(1, "rgba(1, 1, 1, 0)"), n.fillStyle = o, n.fill(), n.restore(), n.restore()
                },
                bt = function(n) {
                    var t, f;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .809352 * u, .32653 * r, 0, i, !1), t = n.createRadialGradient(.5 * r, .809352 * u, 0, .5 * r, .809352 * u, .32653 * r), t.addColorStop(0, "rgb(85, 185, 123)"), t.addColorStop(1, "rgb(0, 31, 0)"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(0, .812949 * u), n.bezierCurveTo(0, .910071 * u, .224489 * r, .989208 * u, .5 * r, .989208 * u), n.bezierCurveTo(.77551 * r, .989208 * u, r, .910071 * u, r, .809352 * u), n.bezierCurveTo(.908163 * r, .751798 * u, .704081 * r, .68705 * u, .5 * r, .68705 * u), n.bezierCurveTo(.285714 * r, .68705 * u, .081632 * r, .751798 * u, 0, .812949 * u), n.closePath(), f = n.createRadialGradient(.5 * r, .809352 * u, 0, .5 * r, .809352 * u, .515306 * r), f.addColorStop(0, "rgb(65, 187, 126)"), f.addColorStop(1, "rgba(4, 37, 8, 0)"), n.fillStyle = f, n.fill(), n.restore(), n.restore()
                },
                kt = function(n) {
                    var f, t;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .809352 * u, .32653 * r, 0, i, !1), f = n.createRadialGradient(.5 * r, .809352 * u, 0, .5 * r, .809352 * u, .32653 * r), f.addColorStop(0, "rgba(0, 255, 0, 0.25)"), f.addColorStop(1, "rgba(0, 255, 0, 0.05)"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .809352 * u, .32653 * r, 0, i, !1), t = n.createRadialGradient(.5 * r, .809352 * u, 0, .5 * r, .809352 * u, .32653 * r), t.addColorStop(0, "rgba(1, 1, 1, 0)"), t.addColorStop(.55, "rgba(0, 0, 0, 0)"), t.addColorStop(.5501, "rgba(0, 0, 0, 0)"), t.addColorStop(.78, "rgba(0, 0, 0, 0.12)"), t.addColorStop(.79, "rgba(0, 0, 0, 0.12)"), t.addColorStop(1, "rgba(0, 0, 0, 0.5)"), n.fillStyle = t, n.fill(), n.restore(), n.fillStyle = n.createPattern(b, "repeat"), n.fill(), n.restore()
                },
                dt = function(n) {
                    var t, f, e, o;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .496402 * u, .397959 * r, 0, i, !1), t = n.createLinearGradient(0, .356115 * u, 0, .63669 * u), t.addColorStop(0, "#ffffff"), t.addColorStop(.05, "rgb(204, 204, 204)"), t.addColorStop(.1, "rgb(153, 153, 153)"), t.addColorStop(.17, "#666666"), t.addColorStop(.27, "#333333"), t.addColorStop(1, "#010101"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.scale(1.083333, 1), n.beginPath(), n.arc(.461538 * r, .507194 * u, .367346 * r, 0, i, !1), f = n.createLinearGradient(0, .377697 * u, 0, .63669 * u), f.addColorStop(0, "#000000"), f.addColorStop(.35, "#040404"), f.addColorStop(.66, "#000000"), f.addColorStop(1, "#010101"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .5 * u, .357142 * r, 0, i, !1), e = n.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .362244 * r), e.addColorStop(0, "#000000"), e.addColorStop(.88, "#000000"), e.addColorStop(.95, "#5e5e5e"), e.addColorStop(1, "#010101"), n.fillStyle = e, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .5 * u, .357142 * r, 0, i, !1), o = n.createLinearGradient(0, .377697 * u, 0, .607913 * u), o.addColorStop(0, "#000000"), o.addColorStop(1, "rgba(1, 1, 1, 0)"), n.fillStyle = o, n.fill(), n.restore(), n.restore()
                },
                gt = function(n) {
                    var t, f;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .5 * u, .32653 * r, 0, i, !1), t = n.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .32653 * r), t.addColorStop(0, "#fed434"), t.addColorStop(1, "#82330c"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(0, .503597 * u), n.bezierCurveTo(0, .600719 * u, .224489 * r, .679856 * u, .5 * r, .679856 * u), n.bezierCurveTo(.77551 * r, .679856 * u, r, .600719 * u, r, .5 * u), n.bezierCurveTo(.908163 * r, .442446 * u, .704081 * r, .377697 * u, .5 * r, .377697 * u), n.bezierCurveTo(.285714 * r, .377697 * u, .081632 * r, .442446 * u, 0, .503597 * u), n.closePath(), f = n.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .515306 * r), f.addColorStop(0, "#fed434"), f.addColorStop(1, "rgba(130, 51, 12, 0)"), n.fillStyle = f, n.fill(), n.restore(), n.restore()
                },
                ni = function(n) {
                    var f, t;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .5 * u, .32653 * r, 0, i, !1), f = n.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .32653 * r), f.addColorStop(0, "rgba(255, 255, 0, 0.25)"), f.addColorStop(1, "rgba(255, 255, 0, 0.05)"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .5 * u, .32653 * r, 0, i, !1), t = n.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .32653 * r), t.addColorStop(0, "rgba(1, 1, 1, 0)"), t.addColorStop(.55, "rgba(0, 0, 0, 0)"), t.addColorStop(.5501, "rgba(0, 0, 0, 0)"), t.addColorStop(.78, "rgba(0, 0, 0, 0.12)"), t.addColorStop(.79, "rgba(0, 0, 0, 0.13)"), t.addColorStop(1, "rgba(0, 0, 0, 0.5)"), n.fillStyle = t, n.fill(), n.restore(), n.fillStyle = n.createPattern(b, "repeat"), n.fill(), n.restore()
                },
                ti = function(n) {
                    var t, f, e, o;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .18705 * u, .397959 * r, 0, i, !1), t = n.createLinearGradient(.5 * r, .046762 * u, .5 * r, .327338 * u), t.addColorStop(0, "#ffffff"), t.addColorStop(.05, "#cccccc"), t.addColorStop(.1, "#999999"), t.addColorStop(.17, "#666666"), t.addColorStop(.27, "#333333"), t.addColorStop(1, "#010101"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.scale(1.083333, 1), n.beginPath(), n.arc(.461538 * r, .197841 * u, .367346 * r, 0, i, !1), f = n.createLinearGradient(.5 * r, .068345 * u, .5 * r, .327338 * u), f.addColorStop(0, "#000000"), f.addColorStop(.35, "#040404"), f.addColorStop(.66, "#000000"), f.addColorStop(1, "#010101"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .190647 * u, .357142 * r, 0, i, !1), e = n.createRadialGradient(.5 * r, .190647 * u, 0, .5 * r, .190647 * u, .362244 * r), e.addColorStop(0, "#000000"), e.addColorStop(.88, "#000000"), e.addColorStop(.95, "#5e5e5e"), e.addColorStop(1, "#010101"), n.fillStyle = e, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .190647 * u, .357142 * r, 0, i, !1), o = n.createLinearGradient(.5 * r, .068345 * u, .5 * r, .298561 * u), o.addColorStop(0, "#000000"), o.addColorStop(1, "rgba(1, 1, 1, 0)"), n.fillStyle = o, n.fill(), n.restore(), n.restore()
                },
                ii = function(n) {
                    var t, f;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .190647 * u, .32653 * r, 0, i, !1), t = n.createRadialGradient(.5 * r, .190647 * u, 0, .5 * r, .190647 * u, .32653 * r), t.addColorStop(0, "#ff0000"), t.addColorStop(1, "#410004"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(0, .194244 * u), n.bezierCurveTo(0, .291366 * u, .224489 * r, .370503 * u, .5 * r, .370503 * u), n.bezierCurveTo(.77551 * r, .370503 * u, r, .291366 * u, r, .190647 * u), n.bezierCurveTo(.908163 * r, .133093 * u, .704081 * r, .068345 * u, .5 * r, .068345 * u), n.bezierCurveTo(.285714 * r, .068345 * u, .081632 * r, .133093 * u, 0, .194244 * u), n.closePath(), f = n.createRadialGradient(.5 * r, .190647 * u, 0, .5 * r, .190647 * u, .515306 * r), f.addColorStop(0, "#ff0000"), f.addColorStop(1, "rgba(118, 5, 1, 0)"), n.fillStyle = f, n.fill(), n.restore(), n.restore()
                },
                ri = function(n) {
                    var f, t;
                    n.save(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .190647 * u, .32653 * r, 0, i, !1), f = n.createRadialGradient(.5 * r, .190647 * u, 0, .5 * r, .190647 * u, .32653 * r), f.addColorStop(0, "rgba(255, 0, 0, 0.25)"), f.addColorStop(1, "rgba(255, 0, 0, 0.05)"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.scale(1, 1), n.beginPath(), n.arc(.5 * r, .190647 * u, .32653 * r, 0, i, !1), t = n.createRadialGradient(.5 * r, .190647 * u, 0, .5 * r, .190647 * u, .32653 * r), t.addColorStop(0, "rgba(1, 1, 1, 0)"), t.addColorStop(.55, "rgba(0, 0, 0, 0)"), t.addColorStop(.5501, "rgba(0, 0, 0, 0)"), t.addColorStop(.78, "rgba(0, 0, 0, 0.12)"), t.addColorStop(.79, "rgba(0, 0, 0, 0.13)"), t.addColorStop(1, "rgba(0, 0, 0, 0.5)"), n.fillStyle = t, n.fill(), n.restore(), n.fillStyle = n.createPattern(b, "repeat"), n.fill(), n.restore()
                };
            return b = ui(2, 2, function(n) {
                n.save(), n.strokeStyle = "rgba(0, 0, 0, 0.1)", n.beginPath(), n.lineTo(0, 0, 1, 0), n.lineTo(0, 1, 0, 1), n.stroke(), n.restore()
            }), ut = function() {
                rt = !0, pt(ft), wt(et), bt(ot), kt(st), dt(ht), gt(ct), ni(lt), ti(at), ii(vt), ri(yt)
            }, this.setRedOn = function(n) {
                nt = n, this.repaint()
            }, this.isRedOn = function() {
                return nt
            }, this.setYellowOn = function(n) {
                tt = n, this.repaint()
            }, this.isYellowOn = function() {
                return tt
            }, this.setGreenOn = function(n) {
                it = n, this.repaint()
            }, this.isGreenOn = function() {
                return it
            }, this.repaint = function() {
                rt || ut(), e.save(), e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.drawImage(o, 0, 0), e.drawImage(s, 0, 0), it && e.drawImage(h, 0, 0), e.drawImage(c, 0, 0), e.drawImage(l, 0, 0), tt && e.drawImage(a, 0, 0), e.drawImage(v, 0, 0), e.drawImage(y, 0, 0), nt && e.drawImage(p, 0, 0), e.drawImage(w, 0, 0), e.restore()
            }, this.repaint(), this
        },
        yr = function(n, t) {
            function nt(n, t, i) {
                var r = f.createElement("canvas");
                return r.width = n, r.height = t, i(r.getContext("2d")), r
            }
            var w;
            t = t || {};
            var u, c = undefined === t.width ? 100 : t.width,
                l = undefined === t.height ? 100 : t.height,
                e = undefined === t.glowColor ? "#ffff00" : t.glowColor,
                a, r, i, p = !1,
                v = !1,
                y = 1,
                o = f.createElement("canvas"),
                k = o.getContext("2d"),
                s = f.createElement("canvas"),
                d = s.getContext("2d"),
                h = f.createElement("canvas"),
                g = h.getContext("2d");
            u = document.getElementById(n).getContext("2d"), u.save(), u.clearRect(0, 0, u.canvas.width, u.canvas.height), u.canvas.width = c, u.canvas.height = l, a = c < l ? c : l, r = a, i = a, w = function(n) {
                var t, i = nt(1, 1, function(t) {
                    t.fillStyle = n, t.beginPath(), t.rect(0, 0, 1, 1), t.fill()
                });
                return t = i.getContext("2d").getImageData(0, 0, 2, 2).data, [t[0], t[1], t[2]]
            }, o.width = r, o.height = i, s.width = r, s.height = i, h.width = r, h.height = i;
            var tt = function(n) {
                    var t;
                    n.save(), n.clearRect(0, 0, n.canvas.width, n.canvas.height), n.save(), n.beginPath(), n.moveTo(.289473 * r, .438596 * i), n.bezierCurveTo(.289473 * r, .561403 * i, .385964 * r, .605263 * i, .385964 * r, .745614 * i), n.bezierCurveTo(.385964 * r, .745614 * i, .587719 * r, .745614 * i, .587719 * r, .745614 * i), n.bezierCurveTo(.587719 * r, .605263 * i, .692982 * r, .561403 * i, .692982 * r, .438596 * i), n.bezierCurveTo(.692982 * r, .324561 * i, .605263 * r, .22807 * i, .5 * r, .22807 * i), n.bezierCurveTo(.385964 * r, .22807 * i, .289473 * r, .324561 * i, .289473 * r, .438596 * i), n.closePath(), t = n.createLinearGradient(0, .289473 * i, 0, .701754 * i), t.addColorStop(0, "#eeeeee"), t.addColorStop(.99, "#999999"), t.addColorStop(1, "#999999"), n.fillStyle = t, n.fill(), n.lineCap = "butt", n.lineJoin = "round", n.lineWidth = .008771 * r, n.strokeStyle = "#cccccc", n.stroke(), n.restore(), n.restore()
                },
                it = function(n) {
                    var t, o = w(e),
                        s = o[0],
                        u = o[1],
                        h = o[2],
                        f = br(s, u, h);
                    n.save(), n.clearRect(0, 0, n.canvas.width, n.canvas.height), n.save(), n.beginPath(), n.moveTo(.289473 * r, .438596 * i), n.bezierCurveTo(.289473 * r, .561403 * i, .385964 * r, .605263 * i, .385964 * r, .745614 * i), n.bezierCurveTo(.385964 * r, .745614 * i, .587719 * r, .745614 * i, .587719 * r, .745614 * i), n.bezierCurveTo(.587719 * r, .605263 * i, .692982 * r, .561403 * i, .692982 * r, .438596 * i), n.bezierCurveTo(.692982 * r, .324561 * i, .605263 * r, .22807 * i, .5 * r, .22807 * i), n.bezierCurveTo(.385964 * r, .22807 * i, .289473 * r, .324561 * i, .289473 * r, .438596 * i), n.closePath(), t = n.createLinearGradient(0, .289473 * i, 0, .701754 * i), s === u && u === h ? (t.addColorStop(0, "hsl(0, 60%, 0%)"), t.addColorStop(1, "hsl(0, 40%, 0%)")) : (t.addColorStop(0, "hsl(" + f[0] * 255 + ", " + f[1] * 100 + "%, 70%)"), t.addColorStop(1, "hsl(" + f[0] * 255 + ", " + f[1] * 100 + "%, 80%)")), n.fillStyle = t, n.shadowOffsetX = 0, n.shadowOffsetY = 0, n.shadowBlur = 30, n.shadowColor = e, n.fill(), n.lineCap = "butt", n.lineJoin = "round", n.lineWidth = .008771 * r, n.strokeStyle = "rgba(" + s + ", " + u + ", " + h + ", 0.4)", n.stroke(), n.restore(), n.restore()
                },
                rt = function(n) {
                    var e, t, f, u;
                    n.save(), n.clearRect(0, 0, n.canvas.width, n.canvas.height), n.save(), n.beginPath(), n.moveTo(.350877 * r, .333333 * i), n.bezierCurveTo(.350877 * r, .280701 * i, .41228 * r, .236842 * i, .5 * r, .236842 * i), n.bezierCurveTo(.578947 * r, .236842 * i, .64035 * r, .280701 * i, .64035 * r, .333333 * i), n.bezierCurveTo(.64035 * r, .385964 * i, .578947 * r, .429824 * i, .5 * r, .429824 * i), n.bezierCurveTo(.41228 * r, .429824 * i, .350877 * r, .385964 * i, .350877 * r, .333333 * i), n.closePath(), e = n.createLinearGradient(0, .245614 * i, 0, .429824 * i), e.addColorStop(0, "#ffffff"), e.addColorStop(.99, "rgba(255, 255, 255, 0)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), n.fillStyle = e, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(.377192 * r, .745614 * i), n.bezierCurveTo(.377192 * r, .745614 * i, .429824 * r, .72807 * i, .491228 * r, .72807 * i), n.bezierCurveTo(.561403 * r, .72807 * i, .605263 * r, .736842 * i, .605263 * r, .736842 * i), n.lineTo(.605263 * r, .763157 * i), n.lineTo(.596491 * r, .780701 * i), n.lineTo(.605263 * r, .798245 * i), n.lineTo(.596491 * r, .815789 * i), n.lineTo(.605263 * r, .833333 * i), n.lineTo(.596491 * r, .850877 * i), n.lineTo(.605263 * r, .868421 * i), n.lineTo(.596491 * r, .885964 * i), n.lineTo(.605263 * r, .894736 * i), n.bezierCurveTo(.605263 * r, .894736 * i, .570175 * r, .95614 * i, .535087 * r, .991228 * i), n.bezierCurveTo(.526315 * r, .991228 * i, .517543 * r, i, .5 * r, i), n.bezierCurveTo(.482456 * r, i, .473684 * r, i, .464912 * r, .991228 * i), n.bezierCurveTo(.421052 * r, .947368 * i, .394736 * r, .903508 * i, .394736 * r, .903508 * i), n.lineTo(.394736 * r, .894736 * i), n.lineTo(.385964 * r, .885964 * i), n.lineTo(.394736 * r, .868421 * i), n.lineTo(.385964 * r, .850877 * i), n.lineTo(.394736 * r, .833333 * i), n.lineTo(.385964 * r, .815789 * i), n.lineTo(.394736 * r, .798245 * i), n.lineTo(.377192 * r, .789473 * i), n.lineTo(.394736 * r, .771929 * i), n.lineTo(.377192 * r, .763157 * i), n.lineTo(.377192 * r, .745614 * i), n.closePath(), t = n.createLinearGradient(.473684 * r, .72807 * i, .484702 * r, .938307 * i), t.addColorStop(0, "#333333"), t.addColorStop(.04, "#d9dad6"), t.addColorStop(.19, "#e4e5e0"), t.addColorStop(.24, "#979996"), t.addColorStop(.31, "#fbffff"), t.addColorStop(.4, "#818584"), t.addColorStop(.48, "#f5f7f4"), t.addColorStop(.56, "#959794"), t.addColorStop(.64, "#f2f2f0"), t.addColorStop(.7, "#828783"), t.addColorStop(.78, "#fcfcfc"), t.addColorStop(1, "#666666"), n.fillStyle = t, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(.377192 * r, .745614 * i), n.bezierCurveTo(.377192 * r, .745614 * i, .429824 * r, .72807 * i, .491228 * r, .72807 * i), n.bezierCurveTo(.561403 * r, .72807 * i, .605263 * r, .736842 * i, .605263 * r, .736842 * i), n.lineTo(.605263 * r, .763157 * i), n.lineTo(.596491 * r, .780701 * i), n.lineTo(.605263 * r, .798245 * i), n.lineTo(.596491 * r, .815789 * i), n.lineTo(.605263 * r, .833333 * i), n.lineTo(.596491 * r, .850877 * i), n.lineTo(.605263 * r, .868421 * i), n.lineTo(.596491 * r, .885964 * i), n.lineTo(.605263 * r, .894736 * i), n.bezierCurveTo(.605263 * r, .894736 * i, .570175 * r, .95614 * i, .535087 * r, .991228 * i), n.bezierCurveTo(.526315 * r, .991228 * i, .517543 * r, i, .5 * r, i), n.bezierCurveTo(.482456 * r, i, .473684 * r, i, .464912 * r, .991228 * i), n.bezierCurveTo(.421052 * r, .947368 * i, .394736 * r, .903508 * i, .394736 * r, .903508 * i), n.lineTo(.394736 * r, .894736 * i), n.lineTo(.385964 * r, .885964 * i), n.lineTo(.394736 * r, .868421 * i), n.lineTo(.385964 * r, .850877 * i), n.lineTo(.394736 * r, .833333 * i), n.lineTo(.385964 * r, .815789 * i), n.lineTo(.394736 * r, .798245 * i), n.lineTo(.377192 * r, .789473 * i), n.lineTo(.394736 * r, .771929 * i), n.lineTo(.377192 * r, .763157 * i), n.lineTo(.377192 * r, .745614 * i), n.closePath(), f = n.createLinearGradient(.377192 * r, .789473 * i, .605263 * r, .789473 * i), f.addColorStop(0, "rgba(0, 0, 0, 0.4)"), f.addColorStop(.15, "rgba(0, 0, 0, 0.32)"), f.addColorStop(.85, "rgba(0, 0, 0, 0.33)"), f.addColorStop(1, "rgba(0, 0, 0, 0.4)"), n.fillStyle = f, n.fill(), n.restore(), n.save(), n.beginPath(), n.moveTo(.421052 * r, .947368 * i), n.bezierCurveTo(.438596 * r, .95614 * i, .447368 * r, .973684 * i, .464912 * r, .991228 * i), n.bezierCurveTo(.473684 * r, i, .482456 * r, i, .5 * r, i), n.bezierCurveTo(.517543 * r, i, .526315 * r, .991228 * i, .535087 * r, .991228 * i), n.bezierCurveTo(.543859 * r, .982456 * i, .561403 * r, .95614 * i, .578947 * r, .947368 * i), n.bezierCurveTo(.552631 * r, .938596 * i, .526315 * r, .938596 * i, .5 * r, .938596 * i), n.bezierCurveTo(.473684 * r, .938596 * i, .447368 * r, .938596 * i, .421052 * r, .947368 * i), n.closePath(), u = n.createLinearGradient(0, .938596 * i, 0, i), u.addColorStop(0, "#050a06"), u.addColorStop(.61, "#070602"), u.addColorStop(.71, "#999288"), u.addColorStop(.83, "#010101"), u.addColorStop(1, "#000000"), n.fillStyle = u, n.fill(), n.restore(), n.restore()
                },
                ut = function(n) {
                    n.save(), n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, n.canvas.width, n.canvas.height), n.restore()
                },
                b = function() {
                    p = !0, tt(k), it(d), rt(g)
                };
            return this.setOn = function(n) {
                v = n, this.repaint()
            }, this.isOn = function() {
                return v
            }, this.setAlpha = function(n) {
                y = n, this.repaint()
            }, this.getAlpha = function() {
                return y
            }, this.setGlowColor = function(n) {
                e = n, b(), this.repaint()
            }, this.getGlowColor = function() {
                return e
            }, this.repaint = function() {
                p || b(), ut(u), u.save(), u.drawImage(o, 0, 0), u.globalAlpha = y, v && u.drawImage(s, 0, 0), u.globalAlpha = 1, u.drawImage(h, 0, 0), u.restore()
            }, this.repaint(), this
        },
        pr = function(n, i) {
            function pt() {
                var t, n;
                for (st = !0, p.rect(0, 0, l, s), t = p.createLinearGradient(0, 0, 0, s), t.addColorStop(0, "rgba(0, 0, 0, 1)"), t.addColorStop(.1, "rgba(0, 0, 0, 0.4)"), t.addColorStop(.33, "rgba(255, 255, 255, 0.45)"), t.addColorStop(.46, "rgba(255, 255, 255, 0)"), t.addColorStop(.9, "rgba(0, 0, 0, 0.4)"), t.addColorStop(1, "rgba(0, 0, 0, 1)"), p.fillStyle = t, p.fill(), r.rect(0, 0, f, o * 1.1), r.fillStyle = vt, r.fill(), r.strokeStyle = "#f0f0f0", r.lineWidth = "1px", r.moveTo(0, 0), r.lineTo(0, o * 1.1), r.stroke(), r.strokeStyle = "#202020", r.moveTo(f, 0), r.lineTo(f, o * 1.1), r.stroke(), r.textAlign = "center", r.textBaseline = "middle", r.font = g, r.fillStyle = yt, n = 9; n < 21; n++) r.fillText(n % 10, f * .5, c * (n - 9) + c / 2);
                if (a > 0)
                    for (u.rect(0, 0, f, o * 1.1), u.fillStyle = ct, u.fill(), u.strokeStyle = "#f0f0f0", u.lineWidth = "1px", u.moveTo(0, 0), u.lineTo(0, o * 1.1), u.stroke(), u.strokeStyle = "#202020", u.moveTo(f, 0), u.lineTo(f, o * 1.1), u.stroke(), u.textAlign = "center", u.textBaseline = "middle", u.font = g, u.fillStyle = lt, n = 9; n < 21; n++) u.fillText(n % 10, f * .5, c * (n - 9) + c / 2);
                for (n = 0; n < b + a; n++) tt[n] = Math.random() * ot * s - ot * s / 2
            }

            function wt() {
                for (var u = 1, o = e, i, t, r, s, n = 0; n < a; n++) o *= 10;
                for (t = Math.floor(o), r = o - t, t = String(t), s = 9, n = 0; n < a + b; n++) i = +t.substring(t.length - n - 1, t.length - n) || 0, s !== 9 && (r = 0), n < a ? w.drawImage(ft, l - f * u, -(c * (i + r) + nt + tt[n])) : w.drawImage(ut, l - f * u, -(c * (i + r) + nt + tt[n])), u++, s = i
            }
            i = i || {};
            var ht = document,
                et = undefined === i._context ? null : i._context,
                s = undefined === i.height ? 40 : i.height,
                b = undefined === i.digits ? 6 : i.digits,
                a = undefined === i.decimals ? 1 : i.decimals,
                ct = undefined === i.decimalBackColor ? "#F0F0F0" : i.decimalBackColor,
                lt = undefined === i.decimalForeColor ? "#F01010" : i.decimalForeColor,
                at = undefined === i.font ? "sans-serif" : i.font,
                e = undefined === i.value ? 0 : i.value,
                vt = undefined === i.valueBackColor ? "#050505" : i.valueBackColor,
                yt = undefined === i.valueForeColor ? "#F8F8F8" : i.valueForeColor,
                ot = undefined === i.wobbleFactor ? .07 : i.wobbleFactor,
                st = !1,
                v, y, k = !1,
                d, f, g, l, o, c, nt, tt = [],
                it, w, rt, p, ut, r, ft, u;
            y = et ? et : ht.getElementById(n).getContext("2d"), e < 0 && (e = 0), d = Math.floor(s * .85), g = "600 " + d + "px " + at, f = Math.floor(s * .68), l = f * (b + a), o = d * 11, c = o / 12, nt = c * .81, y.canvas.width = l, y.canvas.height = s, it = t(l, s), w = it.getContext("2d"), rt = t(l, s), p = rt.getContext("2d"), ut = t(f, o * 1.1), r = ut.getContext("2d"), ft = t(f, o * 1.1), u = ft.getContext("2d"), this.setValueAnimated = function(n) {
                var t = this;
                n < 0 && (n = 0), e !== n && (undefined !== v && v.playing && v.stop(), v = new Tween({}, "", Tween.strongEaseOut, e, n, 2), v.onMotionChanged = function(n) {
                    e = n.target._pos, k || (k = !0, h(t.repaint))
                }, v.start()), this.repaint()
            }, this.setValue = function(n) {
                e = n, e < 0 && (e = 0), this.repaint()
            }, this.getValue = function() {
                return e
            }, this.repaint = function() {
                st || pt(), wt(), w.drawImage(rt, 0, 0), y.drawImage(it, 0, 0), k = !1
            }, this.repaint()
        },
        ci = function(n, t, r, f, e, o) {
            var l = !0,
                s, h, c = o.symbolColor.getRgbaColor();
            for (n.save(), n.lineWidth = 1, n.fillStyle = c, n.strokeStyle = c, n.translate(t, r), s = 0; s < 360; s += 15) l = !l, n.beginPath(), n.arc(0, 0, f * .26, s * u, (s + 15) * u, !1), n.arc(0, 0, f * .23, (s + 15) * u, s * u, !0), n.closePath(), l && n.fill(), n.stroke();
            for (n.translate(-t, -r), s = 0; 360 >= s; s += 90) n.beginPath(), n.moveTo(f * .560747, e * .584112), n.lineTo(f * .640186, e * .644859), n.lineTo(f * .584112, e * .560747), n.lineTo(f * .560747, e * .584112), n.closePath(), n.fillStyle = c, n.fill(), n.stroke(), n.beginPath(), n.moveTo(f * .523364, e * .397196), n.lineTo(f * .5, e * .196261), n.lineTo(f * .471962, e * .397196), n.lineTo(f * .523364, e * .397196), n.closePath(), h = n.createLinearGradient(.476635 * f, 0, .518691 * f, 0), h.addColorStop(0, "rgb(222, 223, 218)"), h.addColorStop(.48, "rgb(222, 223, 218)"), h.addColorStop(.49, c), h.addColorStop(1, c), n.fillStyle = h, n.fill(), n.stroke(), n.translate(t, r), n.rotate(s * u), n.translate(-t, -r);
            n.beginPath(), n.translate(t, r), n.arc(0, 0, f * .1, 0, i, !1), n.lineWidth = f * .022, n.stroke(), n.translate(-t, -r), n.restore()
        },
        et = function(n, r, u, f, e) {
            var c, o, s, h, l = r.toString() + u.type + f.light.getHexColor() + f.medium.getHexColor();
            if (!et.cache[l]) {
                c = t(r, r), o = c.getContext("2d");
                switch (u.type) {
                    case "type2":
                        s = o.createLinearGradient(0, r * .471962, 0, r * .130841), s.addColorStop(0, e.getRgbaColor()), s.addColorStop(.36, e.getRgbaColor()), s.addColorStop(.361, f.light.getRgbaColor()), s.addColorStop(1, f.light.getRgbaColor()), o.fillStyle = s, o.beginPath(), o.moveTo(r * .518691, r * .471962), o.lineTo(r * .509345, r * .462616), o.lineTo(r * .509345, r * .341121), o.lineTo(r * .504672, r * .130841), o.lineTo(r * .495327, r * .130841), o.lineTo(r * .490654, r * .341121), o.lineTo(r * .490654, r * .462616), o.lineTo(r * .481308, r * .471962), o.closePath(), o.fill();
                        break;
                    case "type3":
                        o.beginPath(), o.rect(r * .495327, r * .130841, r * .009345, r * .373831), o.closePath(), o.fillStyle = f.light.getRgbaColor(), o.fill();
                        break;
                    case "type4":
                        s = o.createLinearGradient(.467289 * r, 0, .528036 * r, 0), s.addColorStop(0, f.dark.getRgbaColor()), s.addColorStop(.51, f.dark.getRgbaColor()), s.addColorStop(.52, f.light.getRgbaColor()), s.addColorStop(1, f.light.getRgbaColor()), o.fillStyle = s, o.beginPath(), o.moveTo(r * .5, r * .126168), o.lineTo(r * .514018, r * .135514), o.lineTo(r * .53271, r * .5), o.lineTo(r * .523364, r * .602803), o.lineTo(r * .476635, r * .602803), o.lineTo(r * .467289, r * .5), o.lineTo(r * .485981, r * .135514), o.lineTo(r * .5, r * .126168), o.closePath(), o.fill();
                        break;
                    case "type5":
                        s = o.createLinearGradient(.471962 * r, 0, .528036 * r, 0), s.addColorStop(0, f.light.getRgbaColor()), s.addColorStop(.5, f.light.getRgbaColor()), s.addColorStop(.5, f.medium.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s, o.beginPath(), o.moveTo(r * .5, r * .495327), o.lineTo(r * .528037, r * .495327), o.lineTo(r * .5, r * .149532), o.lineTo(r * .471962, r * .495327), o.lineTo(r * .5, r * .495327), o.closePath(), o.fill(), o.lineWidth = 1, o.lineCap = "square", o.lineJoin = "miter", o.strokeStyle = f.dark.getRgbaColor(), o.stroke();
                        break;
                    case "type6":
                        o.fillStyle = f.medium.getRgbaColor(), o.beginPath(), o.moveTo(r * .481308, r * .485981), o.lineTo(r * .481308, r * .392523), o.lineTo(r * .485981, r * .317757), o.lineTo(r * .495327, r * .130841), o.lineTo(r * .504672, r * .130841), o.lineTo(r * .514018, r * .317757), o.lineTo(r * .518691, r * .38785), o.lineTo(r * .518691, r * .485981), o.lineTo(r * .504672, r * .485981), o.lineTo(r * .504672, r * .38785), o.lineTo(r * .5, r * .317757), o.lineTo(r * .495327, r * .392523), o.lineTo(r * .495327, r * .485981), o.lineTo(r * .481308, r * .485981), o.closePath(), o.fill();
                        break;
                    case "type7":
                        s = o.createLinearGradient(.481308 * r, 0, .518691 * r, 0), s.addColorStop(0, f.dark.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s, o.beginPath(), o.moveTo(r * .490654, r * .130841), o.lineTo(r * .481308, r * .5), o.lineTo(r * .518691, r * .5), o.lineTo(r * .504672, r * .130841), o.lineTo(r * .490654, r * .130841), o.closePath(), o.fill();
                        break;
                    case "type8":
                        s = o.createLinearGradient(.471962 * r, 0, .528036 * r, 0), s.addColorStop(0, f.light.getRgbaColor()), s.addColorStop(.5, f.light.getRgbaColor()), s.addColorStop(.5, f.medium.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s, o.strokeStyle = f.dark.getRgbaColor(), o.beginPath(), o.moveTo(r * .5, r * .53271), o.lineTo(r * .53271, r * .5), o.bezierCurveTo(r * .53271, r * .5, r * .509345, r * .457943, r * .5, r * .149532), o.bezierCurveTo(r * .490654, r * .457943, r * .467289, r * .5, r * .467289, r * .5), o.lineTo(r * .5, r * .53271), o.closePath(), o.fill(), o.stroke();
                        break;
                    case "type9":
                        s = o.createLinearGradient(.471962 * r, 0, .528036 * r, 0), s.addColorStop(0, "rgb(50, 50, 50)"), s.addColorStop(.5, "#666666"), s.addColorStop(1, "rgb(50, 50, 50)"), o.fillStyle = s, o.strokeStyle = "#2E2E2E", o.beginPath(), o.moveTo(r * .495327, r * .233644), o.lineTo(r * .504672, r * .233644), o.lineTo(r * .514018, r * .439252), o.lineTo(r * .485981, r * .439252), o.lineTo(r * .495327, r * .233644), o.closePath(), o.moveTo(r * .490654, r * .130841), o.lineTo(r * .471962, r * .471962), o.lineTo(r * .471962, r * .528037), o.bezierCurveTo(r * .471962, r * .528037, r * .476635, r * .602803, r * .476635, r * .602803), o.bezierCurveTo(r * .476635, r * .607476, r * .481308, r * .607476, r * .5, r * .607476), o.bezierCurveTo(r * .518691, r * .607476, r * .523364, r * .607476, r * .523364, r * .602803), o.bezierCurveTo(r * .523364, r * .602803, r * .528037, r * .528037, r * .528037, r * .528037), o.lineTo(r * .528037, r * .471962), o.lineTo(r * .509345, r * .130841), o.lineTo(r * .490654, r * .130841), o.closePath(), o.fill(), o.beginPath(), o.moveTo(r * .495327, r * .219626), o.lineTo(r * .504672, r * .219626), o.lineTo(r * .504672, r * .135514), o.lineTo(r * .495327, r * .135514), o.lineTo(r * .495327, r * .219626), o.closePath(), o.fillStyle = f.medium.getRgbaColor(), o.fill();
                        break;
                    case "type10":
                        o.beginPath(), o.moveTo(r * .5, r * .149532), o.bezierCurveTo(r * .5, r * .149532, r * .443925, r * .490654, r * .443925, r * .5), o.bezierCurveTo(r * .443925, r * .53271, r * .467289, r * .556074, r * .5, r * .556074), o.bezierCurveTo(r * .53271, r * .556074, r * .556074, r * .53271, r * .556074, r * .5), o.bezierCurveTo(r * .556074, r * .490654, r * .5, r * .149532, r * .5, r * .149532), o.closePath(), s = o.createLinearGradient(.471962 * r, 0, .528036 * r, 0), s.addColorStop(0, f.light.getRgbaColor()), s.addColorStop(.5, f.light.getRgbaColor()), s.addColorStop(.5, f.medium.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s, o.strokeStyle = f.medium.getRgbaColor(), o.lineWidth = 1, o.lineCap = "square", o.lineJoin = "miter", o.fill(), o.stroke();
                        break;
                    case "type11":
                        o.beginPath(), o.moveTo(.5 * r, .168224 * r), o.lineTo(.485981 * r, .5 * r), o.bezierCurveTo(.485981 * r, .5 * r, .481308 * r, .584112 * r, .5 * r, .584112 * r), o.bezierCurveTo(.514018 * r, .584112 * r, .509345 * r, .5 * r, .509345 * r, .5 * r), o.lineTo(.5 * r, .168224 * r), o.closePath(), s = o.createLinearGradient(0, .168224 * r, 0, .584112 * r), s.addColorStop(0, f.medium.getRgbaColor()), s.addColorStop(1, f.dark.getRgbaColor()), o.fillStyle = s, o.strokeStyle = f.dark.getRgbaColor(), o.fill(), o.stroke();
                        break;
                    case "type12":
                        o.beginPath(), o.moveTo(.5 * r, .168224 * r), o.lineTo(.485981 * r, .5 * r), o.lineTo(.5 * r, .504672 * r), o.lineTo(.509345 * r, .5 * r), o.lineTo(.5 * r, .168224 * r), o.closePath(), s = o.createLinearGradient(0, .168224 * r, 0, .504672 * r), s.addColorStop(0, f.medium.getRgbaColor()), s.addColorStop(1, f.dark.getRgbaColor()), o.fillStyle = s, o.strokeStyle = f.dark.getRgbaColor(), o.fill(), o.stroke();
                        break;
                    case "type13":
                    case "type14":
                        o.beginPath(), o.moveTo(.485981 * r, .168224 * r), o.lineTo(.5 * r, .130841 * r), o.lineTo(.509345 * r, .168224 * r), o.lineTo(.509345 * r, .509345 * r), o.lineTo(.485981 * r, .509345 * r), o.lineTo(.485981 * r, .168224 * r), o.closePath(), u.type === "type13" ? (s = o.createLinearGradient(0, .5 * r, 0, .130841 * r), s.addColorStop(0, e.getRgbaColor()), s.addColorStop(.85, e.getRgbaColor()), s.addColorStop(.85, f.medium.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s) : (s = o.createLinearGradient(.485981 * r, 0, .509345 * r, 0), s.addColorStop(0, f.veryDark.getRgbaColor()), s.addColorStop(.5, f.light.getRgbaColor()), s.addColorStop(1, f.veryDark.getRgbaColor()), o.fillStyle = s), o.fill();
                        break;
                    case "type15":
                    case "type16":
                        o.beginPath(), o.moveTo(r * .509345, r * .457943), o.lineTo(r * .5015, r * .13), o.lineTo(r * .4985, r * .13), o.lineTo(r * .490654, r * .457943), o.bezierCurveTo(r * .490654, r * .457943, r * .490654, r * .457943, r * .490654, r * .457943), o.bezierCurveTo(r * .471962, r * .462616, r * .457943, r * .481308, r * .457943, r * .5), o.bezierCurveTo(r * .457943, r * .518691, r * .471962, r * .537383, r * .490654, r * .542056), o.bezierCurveTo(r * .490654, r * .542056, r * .490654, r * .542056, r * .490654, r * .542056), u.type === "type15" ? (o.lineTo(r * .490654, r * .57), o.bezierCurveTo(r * .46, r * .58, r * .46, r * .62, r * .490654, r * .63), o.bezierCurveTo(r * .47, r * .62, r * .48, r * .59, r * .5, r * .59), o.bezierCurveTo(r * .53, r * .59, r * .52, r * .62, r * .509345, r * .63), o.bezierCurveTo(r * .54, r * .62, r * .54, r * .58, r * .509345, r * .57), o.lineTo(r * .509345, r * .57)) : (o.lineTo(r * .490654, r * .621495), o.lineTo(r * .509345, r * .621495)), o.lineTo(r * .509345, r * .542056), o.bezierCurveTo(r * .509345, r * .542056, r * .509345, r * .542056, r * .509345, r * .542056), o.bezierCurveTo(r * .528037, r * .537383, r * .542056, r * .518691, r * .542056, r * .5), o.bezierCurveTo(r * .542056, r * .481308, r * .528037, r * .462616, r * .509345, r * .457943), o.bezierCurveTo(r * .509345, r * .457943, r * .509345, r * .457943, r * .509345, r * .457943), o.closePath(), s = u.type === "type15" ? o.createLinearGradient(0, 0, 0, r * .63) : o.createLinearGradient(0, 0, 0, r * .621495), s.addColorStop(0, f.medium.getRgbaColor()), s.addColorStop(.388888, f.medium.getRgbaColor()), s.addColorStop(.5, f.light.getRgbaColor()), s.addColorStop(.611111, f.medium.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s, o.strokeStyle = f.dark.getRgbaColor(), o.fill(), o.stroke(), o.beginPath(), h = r * .06542 / 2, o.arc(r * .5, r * .5, h, 0, i), s = o.createLinearGradient(r * .5 - h, r * .5 + h, 0, r * .5 + h), s.addColorStop(0, "#e6b35c"), s.addColorStop(.01, "#e6b35c"), s.addColorStop(.99, "#c48200"), s.addColorStop(1, "#c48200"), o.fillStyle = s, o.closePath(), o.fill(), o.beginPath(), h = r * .046728 / 2, o.arc(r * .5, r * .5, h, 0, i), s = o.createRadialGradient(r * .5, r * .5, 0, r * .5, r * .5, h), s.addColorStop(0, "#c5c5c5"), s.addColorStop(.19, "#c5c5c5"), s.addColorStop(.22, "#000000"), s.addColorStop(.8, "#000000"), s.addColorStop(.99, "#707070"), s.addColorStop(1, "#707070"), o.fillStyle = s, o.closePath(), o.fill();
                        break;
                    case "type1":
                    default:
                        s = o.createLinearGradient(0, r * .471962, 0, r * .130841), s.addColorStop(0, f.veryDark.getRgbaColor()), s.addColorStop(.3, f.medium.getRgbaColor()), s.addColorStop(.59, f.medium.getRgbaColor()), s.addColorStop(1, f.veryDark.getRgbaColor()), o.fillStyle = s, o.beginPath(), o.moveTo(r * .518691, r * .471962), o.bezierCurveTo(r * .514018, r * .457943, r * .509345, r * .415887, r * .509345, r * .401869), o.bezierCurveTo(r * .504672, r * .383177, r * .5, r * .130841, r * .5, r * .130841), o.bezierCurveTo(r * .5, r * .130841, r * .490654, r * .383177, r * .490654, r * .397196), o.bezierCurveTo(r * .490654, r * .415887, r * .485981, r * .457943, r * .481308, r * .471962), o.bezierCurveTo(r * .471962, r * .481308, r * .467289, r * .490654, r * .467289, r * .5), o.bezierCurveTo(r * .467289, r * .518691, r * .481308, r * .53271, r * .5, r * .53271), o.bezierCurveTo(r * .518691, r * .53271, r * .53271, r * .518691, r * .53271, r * .5), o.bezierCurveTo(r * .53271, r * .490654, r * .528037, r * .481308, r * .518691, r * .471962), o.closePath(), o.fill()
                }
                et.cache[l] = c
            }
            return n.drawImage(et.cache[l], 0, 0), this
        },
        b, ct, d, ot, lt, k, at, y, c, g, p, it, h, v, s, nt, ht, wt, dt, hi, ri, rt, w, bt, ui, fi, gt;
    et.cache = {}, b = function(r, u, f, e, o, s) {
        var p, h, c, l, a, v, y, w = o.toString() + s + u.design;
        if (!b.cache[w]) {
            p = t(o, s), h = p.getContext("2d"), h.fillStyle = "#848484", h.strokeStyle = "rgba(132, 132, 132, 0.5)", h.beginPath(), h.arc(f, e, o / 2, 0, i, !0), h.closePath(), h.fill(), h.stroke(), h.beginPath(), h.arc(f, e, o * .990654 / 2, 0, i, !0), h.closePath();
            switch (u.design) {
                case "metal":
                    c = h.createLinearGradient(0, o * .004672, 0, s * .990654), c.addColorStop(0, "#fefefe"), c.addColorStop(.07, "rgb(210, 210, 210)"), c.addColorStop(.12, "rgb(179, 179, 179)"), c.addColorStop(1, "rgb(213, 213, 213)"), h.fillStyle = c, h.fill();
                    break;
                case "brass":
                    c = h.createLinearGradient(0, o * .004672, 0, s * .990654), c.addColorStop(0, "rgb(249, 243, 155)"), c.addColorStop(.05, "rgb(246, 226, 101)"), c.addColorStop(.1, "rgb(240, 225, 132)"), c.addColorStop(.5, "rgb(90, 57, 22)"), c.addColorStop(.9, "rgb(249, 237, 139)"), c.addColorStop(.95, "rgb(243, 226, 108)"), c.addColorStop(1, "rgb(202, 182, 113)"), h.fillStyle = c, h.fill();
                    break;
                case "steel":
                    c = h.createLinearGradient(0, o * .004672, 0, s * .990654), c.addColorStop(0, "rgb(231, 237, 237)"), c.addColorStop(.05, "rgb(189, 199, 198)"), c.addColorStop(.1, "rgb(192, 201, 200)"), c.addColorStop(.5, "rgb(23, 31, 33)"), c.addColorStop(.9, "rgb(196, 205, 204)"), c.addColorStop(.95, "rgb(194, 204, 203)"), c.addColorStop(1, "rgb(189, 201, 199)"), h.fillStyle = c, h.fill();
                    break;
                case "gold":
                    c = h.createLinearGradient(0, o * .004672, 0, s * .990654), c.addColorStop(0, "rgb(255, 255, 207)"), c.addColorStop(.15, "rgb(255, 237, 96)"), c.addColorStop(.22, "rgb(254, 199, 57)"), c.addColorStop(.3, "rgb(255, 249, 203)"), c.addColorStop(.38, "rgb(255, 199, 64)"), c.addColorStop(.44, "rgb(252, 194, 60)"), c.addColorStop(.51, "rgb(255, 204, 59)"), c.addColorStop(.6, "rgb(213, 134, 29)"), c.addColorStop(.68, "rgb(255, 201, 56)"), c.addColorStop(.75, "rgb(212, 135, 29)"), c.addColorStop(1, "rgb(247, 238, 101)"), h.fillStyle = c, h.fill();
                    break;
                case "anthracite":
                    c = h.createLinearGradient(0, .004672 * s, 0, .995326 * s), c.addColorStop(0, "rgb(118, 117, 135)"), c.addColorStop(.06, "rgb(74, 74, 82)"), c.addColorStop(.12, "rgb(50, 50, 54)"), c.addColorStop(1, "rgb(79, 79, 87)"), h.fillStyle = c, h.fill();
                    break;
                case "tiltedGray":
                    c = h.createLinearGradient(.233644 * o, .084112 * s, .81258 * o, .910919 * s), c.addColorStop(0, "#ffffff"), c.addColorStop(.07, "rgb(210, 210, 210)"), c.addColorStop(.16, "rgb(179, 179, 179)"), c.addColorStop(.33, "#ffffff"), c.addColorStop(.55, "#c5c5c5"), c.addColorStop(.79, "#ffffff"), c.addColorStop(1, "#666666"), h.fillStyle = c, h.fill();
                    break;
                case "tiltedBlack":
                    c = h.createLinearGradient(.228971 * o, .079439 * s, .802547 * o, .898591 * s), c.addColorStop(0, "#666666"), c.addColorStop(.21, "#000000"), c.addColorStop(.47, "#666666"), c.addColorStop(.99, "#000000"), c.addColorStop(1, "#000000"), h.fillStyle = c, h.fill();
                    break;
                case "glossyMetal":
                    c = h.createRadialGradient(.5 * o, .5 * s, 0, .5 * o, .5 * o, .5 * o), c.addColorStop(0, "rgb(207, 207, 207)"), c.addColorStop(.96, "rgb(205, 204, 205)"), c.addColorStop(1, "rgb(244, 244, 244)"), h.fillStyle = c, h.fill(), h.beginPath(), h.arc(.5 * o, .5 * s, .973962 * o / 2, 0, i), h.closePath(), c = h.createLinearGradient(0, s - .971962 * s, 0, .971962 * s), c.addColorStop(0, "rgb(249, 249, 249)"), c.addColorStop(.23, "rgb(200, 195, 191)"), c.addColorStop(.36, "#ffffff"), c.addColorStop(.59, "rgb(29, 29, 29)"), c.addColorStop(.76, "rgb(200, 194, 192)"), c.addColorStop(1, "rgb(209, 209, 209)"), h.fillStyle = c, h.fill(), h.beginPath(), h.arc(.5 * o, .5 * s, .869158 * o / 2, 0, i), h.closePath(), h.fillStyle = "#f6f6f6", h.fill(), h.beginPath(), h.arc(.5 * o, .5 * s, .85 * o / 2, 0, i), h.closePath(), h.fillStyle = "#333333", h.fill();
                    break;
                case "blackMetal":
                    v = [0, .125, .347222, .5, .680555, .875, 1], y = [new n(254, 254, 254, 1), new n(0, 0, 0, 1), new n(153, 153, 153, 1), new n(0, 0, 0, 1), new n(153, 153, 153, 1), new n(0, 0, 0, 1), new n(254, 254, 254, 1)], h.save(), h.clip(h.arc(f, e, o * .990654 / 2, 0, i, !0)), l = o * .495327, a = o * .42056, c = new ft(v, y), c.fillCircle(h, f, e, a, l), h.strokeStyle = "#848484", h.strokeStyle = "rgba(132, 132, 132, 0.8)", h.beginPath(), h.lineWidth = o / 90, h.arc(f, e, o / 2, 0, i, !0), h.closePath(), h.stroke(), h.restore();
                    break;
                case "shinyMetal":
                    v = [0, .125, .25, .347222, .5, .652777, .75, .875, 1], y = [new n(254, 254, 254, 1), new n(210, 210, 210, 1), new n(179, 179, 179, 1), new n(238, 238, 238, 1), new n(160, 160, 160, 1), new n(238, 238, 238, 1), new n(179, 179, 179, 1), new n(210, 210, 210, 1), new n(254, 254, 254, 1)], h.save(), h.clip(h.arc(f, e, o * .990654 / 2, 0, i, !0)), l = o * .495327, a = o * .42056, c = new ft(v, y), c.fillCircle(h, f, e, a, l), h.strokeStyle = "#848484", h.strokeStyle = "rgba(132, 132, 132, 0.8)", h.beginPath(), h.lineWidth = o / 90, h.arc(f, e, o / 2, 0, i, !0), h.closePath(), h.stroke(), h.restore();
                    break;
                case "chrome":
                    v = [0, .09, .12, .16, .25, .29, .33, .38, .48, .52, .63, .68, .8, .83, .87, .97, 1], y = [new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(136, 136, 138, 1), new n(164, 185, 190, 1), new n(158, 179, 182, 1), new n(112, 112, 112, 1), new n(221, 227, 227, 1), new n(155, 176, 179, 1), new n(156, 176, 177, 1), new n(254, 255, 255, 1), new n(255, 255, 255, 1), new n(156, 180, 180, 1), new n(198, 209, 211, 1), new n(246, 248, 247, 1), new n(204, 216, 216, 1), new n(164, 188, 190, 1), new n(255, 255, 255, 1)], h.save(), h.clip(h.arc(f, e, o * .990654 / 2, 0, i, !0)), l = o * .495327, a = o * .42056, c = new ft(v, y), c.fillCircle(h, f, e, a, l), h.strokeStyle = "#848484", h.strokeStyle = "rgba(132, 132, 132, 0.8)", h.beginPath(), h.lineWidth = o / 90, h.arc(f, e, o / 2, 0, i, !0), h.closePath(), h.stroke(), h.restore()
            }
            h.fillStyle = "rgb(191, 191, 191)", h.beginPath(), h.arc(f, e, o * .841121 / 2, 0, i, !0), h.closePath(), h.fill(), h.globalCompositeOperation = "destination-out", h.beginPath(), h.arc(f, e, o * .83 / 2, 0, i, !0), h.closePath(), h.fill(), b.cache[w] = p
        }
        return r.drawImage(b.cache[w], 0, 0), this
    }, b.cache = {}, ct = function(i, r, u, f, e) {
        var h, p, s, c, w, y, o, a = [],
            v = [],
            b = u.toString() + f + r.design + e;
        if (!ct.cache[b]) {
            h = Math.sqrt(u * u + f * f) * .04, h = Math.min(h, (e ? u : f) * .1), p = t(u, f), s = p.getContext("2d"), e ? (c = u * .05, w = c - 1, y = u * .028571) : (c = f * .05, w = c - 1, y = f * .028571), l(s, 0, 0, u, f, c), s.fillStyle = "#838383", s.fill(), l(s, 1, 1, u - 2, f - 2, w);
            switch (r.design) {
                case "metal":
                    o = s.createLinearGradient(0, u * .004672, 0, f * .990654), o.addColorStop(0, "#fefefe"), o.addColorStop(.07, "rgb(210, 210, 210)"), o.addColorStop(.12, "rgb(179, 179, 179)"), o.addColorStop(1, "rgb(213, 213, 213)"), s.fillStyle = o, s.fill();
                    break;
                case "brass":
                    o = s.createLinearGradient(0, u * .004672, 0, f * .990654), o.addColorStop(0, "rgb(249, 243, 155)"), o.addColorStop(.05, "rgb(246, 226, 101)"), o.addColorStop(.1, "rgb(240, 225, 132)"), o.addColorStop(.5, "rgb(90, 57, 22)"), o.addColorStop(.9, "rgb(249, 237, 139)"), o.addColorStop(.95, "rgb(243, 226, 108)"), o.addColorStop(1, "rgb(202, 182, 113)"), s.fillStyle = o, s.fill();
                    break;
                case "steel":
                    o = s.createLinearGradient(0, u * .004672, 0, f * .990654), o.addColorStop(0, "rgb(231, 237, 237)"), o.addColorStop(.05, "rgb(189, 199, 198)"), o.addColorStop(.1, "rgb(192, 201, 200)"), o.addColorStop(.5, "rgb(23, 31, 33)"), o.addColorStop(.9, "rgb(196, 205, 204)"), o.addColorStop(.95, "rgb(194, 204, 203)"), o.addColorStop(1, "rgb(189, 201, 199)"), s.fillStyle = o, s.fill();
                    break;
                case "gold":
                    o = s.createLinearGradient(0, u * .004672, 0, f * .990654), o.addColorStop(0, "rgb(255, 255, 207)"), o.addColorStop(.15, "rgb(255, 237, 96)"), o.addColorStop(.22, "rgb(254, 199, 57)"), o.addColorStop(.3, "rgb(255, 249, 203)"), o.addColorStop(.38, "rgb(255, 199, 64)"), o.addColorStop(.44, "rgb(252, 194, 60)"), o.addColorStop(.51, "rgb(255, 204, 59)"), o.addColorStop(.6, "rgb(213, 134, 29)"), o.addColorStop(.68, "rgb(255, 201, 56)"), o.addColorStop(.75, "rgb(212, 135, 29)"), o.addColorStop(1, "rgb(247, 238, 101)"), s.fillStyle = o, s.fill();
                    break;
                case "anthracite":
                    o = s.createLinearGradient(0, .004672 * f, 0, .995326 * f), o.addColorStop(0, "rgb(118, 117, 135)"), o.addColorStop(.06, "rgb(74, 74, 82)"), o.addColorStop(.12, "rgb(50, 50, 54)"), o.addColorStop(1, "rgb(79, 79, 87)"), s.fillStyle = o, s.fill();
                    break;
                case "tiltedGray":
                    o = s.createLinearGradient(.233644 * u, .084112 * f, .81258 * u, .910919 * f), o.addColorStop(0, "#ffffff"), o.addColorStop(.07, "rgb(210, 210, 210)"), o.addColorStop(.16, "rgb(179, 179, 179)"), o.addColorStop(.33, "#ffffff"), o.addColorStop(.55, "#c5c5c5"), o.addColorStop(.79, "#ffffff"), o.addColorStop(1, "#666666"), s.fillStyle = o, s.fill();
                    break;
                case "tiltedBlack":
                    o = s.createLinearGradient(.228971 * u, .079439 * f, .802547 * u, .898591 * f), o.addColorStop(0, "#666666"), o.addColorStop(.21, "#000000"), o.addColorStop(.47, "#666666"), o.addColorStop(.99, "#000000"), o.addColorStop(1, "#000000"), s.fillStyle = o, s.fill();
                    break;
                case "glossyMetal":
                    s.clip(l(s, 1, 1, u - 2, f - 2, c)), o = s.createLinearGradient(0, 1, 0, f - 2), o.addColorStop(0, "rgb(249, 249, 249)"), o.addColorStop(.2, "rgb(200, 195, 191)"), o.addColorStop(.3, "#ffffff"), o.addColorStop(.6, "rgb(29, 29, 29)"), o.addColorStop(.8, "rgb(200, 194, 192)"), o.addColorStop(1, "rgb(209, 209, 209)"), s.fillStyle = o, s.fill(), s.clip(l(s, h - 2, h - 2, u - (h - 2) * 2, f - (h - 2) * 2, y)), s.fillStyle = "#f6f6f6", s.fill(), s.clip(l(s, h - 1, h - 1, u - (h - 1) * 2, f - (h - 1) * 2, y)), s.fillStyle = "#333333", s.fill();
                    break;
                case "blackMetal":
                    a = [0, .125, .347222, .5, .680555, .875, 1], v = [new n("#FFFFFF"), new n("#000000"), new n("#999999"), new n("#000000"), new n("#999999"), new n("#000000"), new n("#FFFFFF")], s.beginPath(), l(s, 1, 1, u - 2, f - 2, c), s.closePath(), s.clip(), o = new ft(a, v), o.fillRect(s, u / 2, f / 2, u, f, h, h);
                    break;
                case "shinyMetal":
                    a = [0, .125, .25, .347222, .5, .652777, .75, .875, 1], v = [new n("#FFFFFF"), new n("#D2D2D2"), new n("#B3B3B3"), new n("#EEEEEE"), new n("#A0A0A0"), new n("#EEEEEE"), new n("#B3B3B3"), new n("#D2D2D2"), new n("#FFFFFF")], s.beginPath(), l(s, 1, 1, u - 2, f - 2, c), s.closePath(), s.clip(), o = new ft(a, v), o.fillRect(s, u / 2, f / 2, u, f, h, h);
                    break;
                case "chrome":
                    a = [0, .09, .12, .16, .25, .29, .33, .38, .48, .52, .63, .68, .8, .83, .87, .97, 1], v = [new n("#FFFFFF"), new n("#FFFFFF"), new n("#888890"), new n("#A4B9BE"), new n("#9EB3B6"), new n("#707070"), new n("#DDE3E3"), new n("#9BB0B3"), new n("#9CB0B1"), new n("#FEFFFF"), new n("#FFFFFF"), new n("#9CB4B4"), new n("#C6D1D3"), new n("#F6F8F7"), new n("#CCD8D8"), new n("#A4BCBE"), new n("#FFFFFF")], s.beginPath(), l(s, 1, 1, u - 2, f - 2, c), s.closePath(), s.clip(), o = new ft(a, v), o.fillRect(s, u / 2, f / 2, u, f, h, h)
            }
            l(s, h - 1, h - 1, u - (h - 1) * 2, f - (h - 1) * 2, y - 1), s.fillStyle = "rgb(192, 192, 192)", s.globalCompositeOperation = "destination-out", l(s, h, h, u - h * 2, f - h * 2, 4), s.fill(), ct.cache[b] = p
        }
        return i.drawImage(ct.cache[b], 0, 0), this
    }, ct.cache = {}, d = function(r, f, e, o, s, h) {
        var w, c, l, g, nt, a = s * .831775 / 2,
            tt, it, rt, p, y, v, ut, b, k = s.toString() + h + f.name;
        if (!d.cache[k]) {
            if (w = t(s, h), c = w.getContext("2d"), c.beginPath(), c.arc(e, o, a, 0, i, !0), c.closePath(), f.name === "CARBON" || f.name === "PUNCHED_SHEET" || f.name === "BRUSHED_METAL" || f.name === "BRUSHED_STAINLESS") f.name === "CARBON" && (c.fillStyle = c.createPattern(li, "repeat"), c.fill()), f.name === "PUNCHED_SHEET" && (c.fillStyle = c.createPattern(ai, "repeat"), c.fill()), l = c.createLinearGradient(a, 0, s - a, 0), l.addColorStop(0, "rgba(0, 0, 0, 0.25)"), l.addColorStop(.5, "rgba(0, 0, 0, 0)"), l.addColorStop(1, "rgba(0, 0, 0, 0.25)"), c.fillStyle = l, c.beginPath(), c.arc(e, o, a, 0, i, !0), c.closePath(), c.fill(), (f.name === "BRUSHED_METAL" || f.name === "BRUSHED_STAINLESS") && (tt = f.name === "BRUSHED_METAL" ? !0 : !1, it = parseInt(f.gradientStop.getHexColor().substr(-6), 16), rt = vi(it, 5, .1, tt, .5), c.fillStyle = c.createPattern(rt.fill(0, 0, s, h), "no-repeat"), c.fill());
            else if (f.name === "STAINLESS" || f.name === "TURNED") {
                if (g = [0, .03, .1, .14, .24, .33, .38, .5, .62, .67, .76, .81, .85, .97, 1], nt = [new n("#FDFDFD"), new n("#FDFDFD"), new n("#B2B2B4"), new n("#ACACAE"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#ACACAE"), new n("#B2B2B4"), new n("#FDFDFD"), new n("#FDFDFD")], l = new ft(g, nt), l.fillCircle(c, e, o, 0, a), f.name === "TURNED") {
                    for (p = a, y = p * .55, v = u * (500 / p), c.save(), c.beginPath(), c.arc(e, o, p, 0, i), c.closePath(), c.clip(), c.lineWidth = .5, ut = i - v * .3, b = 0; b < ut; b += v) c.strokeStyle = "rgba(240, 240, 255, 0.25)", c.beginPath(), c.arc(e + y, o, y, 0, i), c.stroke(), c.translate(e, o), c.rotate(v * .3), c.translate(-e, -o), c.strokeStyle = "rgba(25, 10, 10, 0.1)", c.beginPath(), c.arc(e + y, o, y, 0, i), c.stroke(), c.translate(e, o), c.rotate(v - v * .3), c.translate(-e, -o);
                    c.restore()
                }
            } else l = c.createLinearGradient(0, s * .084112, 0, a * 2), l.addColorStop(0, f.gradientStart.getRgbaColor()), l.addColorStop(.4, f.gradientFraction.getRgbaColor()), l.addColorStop(1, f.gradientStop.getRgbaColor()), c.fillStyle = l, c.fill();
            l = c.createRadialGradient(e, o, 0, e, o, a), l.addColorStop(0, "rgba(0, 0, 0, 0)"), l.addColorStop(.7, "rgba(0, 0, 0, 0)"), l.addColorStop(.71, "rgba(0, 0, 0, 0)"), l.addColorStop(.86, "rgba(0, 0, 0, 0.03)"), l.addColorStop(.92, "rgba(0, 0, 0, 0.07)"), l.addColorStop(.97, "rgba(0, 0, 0, 0.15)"), l.addColorStop(1, "rgba(0, 0, 0, 0.3)"), c.fillStyle = l, c.beginPath(), c.arc(e, o, a, 0, i, !0), c.closePath(), c.fill(), d.cache[k] = w
        }
        return r.drawImage(d.cache[k], 0, 0), this
    }, d.cache = {}, ot = function(n, t, r, u, f, e) {
        var o = f * .831775,
            s = e * .831775,
            h = (f - o) / 2,
            c = (e - s) / 2;
        return t !== null && t.height > 0 && t.width > 0 && (n.save(), n.beginPath(), n.arc(r, u, f * .831775 / 2, 0, i, !0), n.clip(), n.drawImage(t, h, c, o, s), n.restore()), this
    }, lt = function(r, u, f, e, o) {
        var a, nt, c, tt, b, h, k, s, et, d, w, v, y, p, it, rt, ut, g = f.toString() + e + o + u.name;
        if (!lt.cache[g]) {
            if (h = Math.sqrt(f * f + e * e) * .04, h = Math.min(h, (o ? f : e) * .1), k = t(f, e), s = k.getContext("2d"), et = u, l(s, h, h, f - h * 2, e - h * 2, 4), u.name === "CARBON" || u.name === "PUNCHED_SHEET" || u.name === "STAINLESS" || u.name === "BRUSHED_METAL" || u.name === "BRUSHED_STAINLESS" || u.name === "TURNED") {
                if (u.name === "CARBON" && (s.fillStyle = s.createPattern(li, "repeat"), s.fill()), u.name === "PUNCHED_SHEET" && (s.fillStyle = s.createPattern(ai, "repeat"), s.fill()), (u.name === "STAINLESS" || u.name === "TURNED") && (tt = [0, .03, .1, .14, .24, .33, .38, .5, .62, .67, .76, .81, .85, .97, 1], b = [new n("#FDFDFD"), new n("#FDFDFD"), new n("#B2B2B4"), new n("#ACACAE"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#ACACAE"), new n("#B2B2B4"), new n("#FDFDFD"), new n("#FDFDFD")], c = new ft(tt, b), s.clip(l(s, h, h, f - h * 2, e - h * 2, 4)), c.fillRect(s, f / 2, e / 2, f - h * 2, e - h * 2, f / 2, e / 2), c = s.createLinearGradient(0, h, 0, e - h * 2), c.addColorStop(0, "rgba(0, 0, 0, 0.25)"), c.addColorStop(.1, "rgba(0, 0, 0, 0.05)"), c.addColorStop(1, "rgba(0, 0, 0, 0)"), s.fillStyle = c, l(s, h, h, f - h * 2, e - h * 2, 4), s.fill(), s.restore(), u.name === "TURNED")) {
                    for (d = Math.sqrt((f - h * 2) * (f - h * 2) + (e - h * 2) * (e - h * 2)) / 2, w = d * .55, v = f / 2, y = e / 2, p = i / 360 * (400 / d), s.save(), s.beginPath(), l(s, h, h, f - h * 2, e - h * 2, 4), s.clip(), s.lineWidth = .5, nt = i - p * .3, a = 0; a < nt; a += p) s.strokeStyle = "rgba(240, 240, 255, 0.25)", s.beginPath(), s.arc(v + w, y, w, 0, i), s.stroke(), s.translate(v, y), s.rotate(p * .3), s.translate(-v, -y), s.strokeStyle = "rgba(25, 10, 10, 0.1)", s.beginPath(), s.arc(v + w, y, w, 0, i), s.stroke(), s.translate(v, y), s.rotate(-p * .3), s.translate(-v, -y), s.translate(v, y), s.rotate(p), s.translate(-v, -y);
                    s.restore()
                }
                c = s.createLinearGradient(h, h, f - h * 2, e - h * 2), c.addColorStop(0, "rgba(0, 0, 0, 0.25)"), c.addColorStop(.5, "rgba(0, 0, 0, 0)"), c.addColorStop(1, "rgba(0, 0, 0, 0.25)"), s.fillStyle = c, l(s, h, h, f - h * 2, e - h * 2, 4), s.fill(), (u.name === "BRUSHED_METAL" || u.name === "BRUSHED_STAINLESS") && (it = u.name === "BRUSHED_METAL" ? !0 : !1, rt = parseInt(u.gradientStop.getHexColor().substr(-6), 16), ut = vi(rt, 5, .1, it, .5), s.fillStyle = s.createPattern(ut.fill(0, 0, f, e), "no-repeat"), s.fill())
            } else c = s.createLinearGradient(0, h, 0, e - h * 2), c.addColorStop(0, u.gradientStart.getRgbaColor()), c.addColorStop(.4, u.gradientFraction.getRgbaColor()), c.addColorStop(1, u.gradientStop.getRgbaColor()), s.fillStyle = c, s.fill();
            for (b = ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.15)", "rgba(0, 0, 0, 0.07)", "rgba(0, 0, 0, 0.03)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"], a = 0; a < 7; a++) l(s, h + a, h + a, f - h * 2 - 2 * a, e - h * 2 - 2 * a, 4), s.strokeStyle = b[a], s.stroke();
            lt.cache[g] = k
        }
        return r.drawImage(lt.cache[g], 0, 0), this
    }, lt.cache = {}, k = function(n, i, r, u, f, e, o, s, h) {
        var w, c, a = Math.ceil(u * .084112),
            v = r * .5 - a / 2,
            b = u * .5 - a / 2,
            g = r * .008,
            l, p, d = i.type + r + u + f + (e !== undefined ? e.type : "-") + (o !== undefined ? o.style : "-") + (h !== undefined ? h.type : "-");
        if (!k.cache[d]) {
            w = t(r, u), c = w.getContext("2d"), f && (c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowOffsetX = c.shadowOffsetY = g, c.shadowBlur = g * 2, s === steelseries.GaugeType.TYPE5 ? steelseries.Orientation.WEST === h ? (v = r * .733644 - a / 2, c.drawImage(y(a, e, o), v, b)) : (b = u * .733644 - a / 2, c.drawImage(y(a, e, o), v, u * .6857)) : c.drawImage(y(a, e, o), v, b), c.shadowOffsetX = c.shadowOffsetY = 0, c.shadowBlur = 0);
            switch (i.type) {
                case "type2":
                    c.beginPath(), c.moveTo(r * .135514, u * .696261), c.bezierCurveTo(r * .214953, u * .588785, r * .317757, u * .5, r * .462616, u * .425233), c.bezierCurveTo(r * .612149, u * .345794, r * .733644, u * .317757, r * .873831, u * .322429), c.bezierCurveTo(r * .766355, u * .112149, r * .528037, u * .023364, r * .313084, u * .130841), c.bezierCurveTo(r * .09813, u * .238317, r * .028037, u * .485981, r * .135514, u * .696261), c.closePath(), l = c.createLinearGradient(.313084 * r, .135514 * u, .495528 * r, .493582 * u), l.addColorStop(0, "rgba(255, 255, 255, 0.275)"), l.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                    break;
                case "type3":
                    c.beginPath(), c.moveTo(r * .084112, u * .509345), c.bezierCurveTo(r * .21028, u * .556074, r * .462616, u * .560747, r * .5, u * .560747), c.bezierCurveTo(r * .537383, u * .560747, r * .794392, u * .560747, r * .915887, u * .509345), c.bezierCurveTo(r * .915887, u * .2757, r * .738317, u * .084112, r * .5, u * .084112), c.bezierCurveTo(r * .261682, u * .084112, r * .084112, u * .2757, r * .084112, u * .509345), c.closePath(), l = c.createLinearGradient(0, .093457 * u, 0, .556073 * u), l.addColorStop(0, "rgba(255, 255, 255, 0.275)"), l.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                    break;
                case "type4":
                    c.beginPath(), c.moveTo(r * .67757, u * .24299), c.bezierCurveTo(r * .771028, u * .308411, r * .822429, u * .411214, r * .813084, u * .528037), c.bezierCurveTo(r * .799065, u * .654205, r * .719626, u * .757009, r * .593457, u * .799065), c.bezierCurveTo(r * .485981, u * .831775, r * .369158, u * .808411, r * .285046, u * .728971), c.bezierCurveTo(r * .2757, u * .719626, r * .252336, u * .714953, r * .233644, u * .728971), c.bezierCurveTo(r * .214953, u * .747663, r * .219626, u * .771028, r * .228971, u * .7757), c.bezierCurveTo(r * .331775, u * .878504, r * .476635, u * .915887, r * .616822, u * .869158), c.bezierCurveTo(r * .771028, u * .822429, r * .873831, u * .691588, r * .88785, u * .53271), c.bezierCurveTo(r * .897196, u * .38785, r * .836448, u * .257009, r * .719626, u * .182242), c.bezierCurveTo(r * .705607, u * .172897, r * .682242, u * .163551, r * .663551, u * .186915), c.bezierCurveTo(r * .654205, u * .205607, r * .668224, u * .238317, r * .67757, u * .24299), c.closePath(), l = c.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .38785 * r), l.addColorStop(0, "rgba(255, 255, 255, 0)"), l.addColorStop(.82, "rgba(255, 255, 255, 0)"), l.addColorStop(.83, "rgba(255, 255, 255, 0)"), l.addColorStop(1, "rgba(255, 255, 255, 0.15)"), c.beginPath(), c.moveTo(r * .261682, u * .224299), c.bezierCurveTo(r * .285046, u * .238317, r * .252336, u * .285046, r * .24299, u * .317757), c.bezierCurveTo(r * .24299, u * .350467, r * .271028, u * .383177, r * .271028, u * .397196), c.bezierCurveTo(r * .2757, u * .415887, r * .261682, u * .457943, r * .238317, u * .509345), c.bezierCurveTo(r * .224299, u * .542056, r * .17757, u * .612149, r * .158878, u * .612149), c.bezierCurveTo(r * .144859, u * .612149, r * .088785, u * .546728, r * .130841, u * .369158), c.bezierCurveTo(r * .140186, u * .336448, r * .214953, u * .200934, r * .261682, u * .224299), c.closePath(), p = c.createLinearGradient(.130841 * r, .369158 * u, .273839 * r, .412877 * u), p.addColorStop(0, "rgba(255, 255, 255, 0.275)"), p.addColorStop(1, "rgba(255, 255, 255, 0.015)"), c.fillStyle = p, c.fill();
                    break;
                case "type5":
                    c.beginPath(), c.moveTo(r * .084112, u * .5), c.bezierCurveTo(r * .084112, u * .271028, r * .271028, u * .084112, r * .5, u * .084112), c.bezierCurveTo(r * .700934, u * .084112, r * .864485, u * .224299, r * .906542, u * .411214), c.bezierCurveTo(r * .911214, u * .439252, r * .911214, u * .518691, r * .845794, u * .537383), c.bezierCurveTo(r * .794392, u * .546728, r * .551401, u * .411214, r * .392523, u * .457943), c.bezierCurveTo(r * .168224, u * .509345, r * .135514, u * .7757, r * .093457, u * .593457), c.bezierCurveTo(r * .088785, u * .560747, r * .084112, u * .53271, r * .084112, u * .5), c.closePath(), l = c.createLinearGradient(0, .084112 * u, 0, .644859 * u), l.addColorStop(0, "rgba(255, 255, 255, 0.275)"), l.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                    break;
                case "type1":
                default:
                    c.beginPath(), c.moveTo(r * .084112, u * .509345), c.bezierCurveTo(r * .205607, u * .448598, r * .336448, u * .415887, r * .5, u * .415887), c.bezierCurveTo(r * .672897, u * .415887, r * .789719, u * .443925, r * .915887, u * .509345), c.bezierCurveTo(r * .915887, u * .2757, r * .738317, u * .084112, r * .5, u * .084112), c.bezierCurveTo(r * .261682, u * .084112, r * .084112, u * .2757, r * .084112, u * .509345), c.closePath(), l = c.createLinearGradient(0, .088785 * u, 0, .490654 * u), l.addColorStop(0, "rgba(255, 255, 255, 0.275)"), l.addColorStop(1, "rgba(255, 255, 255, 0.015)")
            }
            c.fillStyle = l, c.fill(), k.cache[d] = w
        }
        return n.drawImage(k.cache[d], 0, 0), this
    }, k.cache = {}, at = function(n, i, r, u) {
        var c, o, e, s, f, h, l = i.toString() + r + u;
        return at.cache[l] || (c = t(i, r), o = c.getContext("2d"), s = Math.sqrt(i * i + r * r) * .04, s = Math.min(s, (u ? i : r) * .1), f = s * 1.3, h = f * 1.33, o.beginPath(), o.moveTo(f, r - f), o.lineTo(i - f, r - f), o.bezierCurveTo(i - f, r - f, i - h, r * .7, i - h, r * .5), o.bezierCurveTo(i - h, h, i - f, f, i - s, f), o.lineTo(f, f), o.bezierCurveTo(f, f, h, r * .285714, h, r * .5), o.bezierCurveTo(h, r * .7, f, r - f, s, r - f), o.closePath(), e = o.createLinearGradient(0, r - s, 0, s), e.addColorStop(0, "rgba(255, 255, 255, 0)"), e.addColorStop(.06, "rgba(255, 255, 255, 0)"), e.addColorStop(.07, "rgba(255, 255, 255, 0)"), e.addColorStop(.12, "rgba(255, 255, 255, 0)"), e.addColorStop(.17, "rgba(255, 255, 255, 0.013546)"), e.addColorStop(.1701, "rgba(255, 255, 255, 0)"), e.addColorStop(.79, "rgba(255, 255, 255, 0)"), e.addColorStop(.8, "rgba(255, 255, 255, 0)"), e.addColorStop(.84, "rgba(255, 255, 255, 0.082217)"), e.addColorStop(.93, "rgba(255, 255, 255, 0.288702)"), e.addColorStop(.94, "rgba(255, 255, 255, 0.298039)"), e.addColorStop(.96, "rgba(255, 255, 255, 0.119213)"), e.addColorStop(.97, "rgba(255, 255, 255, 0)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), o.fillStyle = e, o.fill(), at.cache[l] = c), n.drawImage(at.cache[l], 0, 0), this
    }, at.cache = {}, y = function(n, r, u) {
        var h, f, o = n / 2,
            s = n / 2,
            e, c = n.toString() + r.type + u.style;
        if (!y.cache[c]) {
            h = t(n * 1.18889, n * 1.18889), f = h.getContext("2d");
            switch (r.type) {
                case "metalKnob":
                    f.beginPath(), f.moveTo(0, n * .5), f.bezierCurveTo(0, n * .222222, n * .222222, 0, n * .5, 0), f.bezierCurveTo(n * .777777, 0, n, n * .222222, n, n * .5), f.bezierCurveTo(n, n * .777777, n * .777777, n, n * .5, n), f.bezierCurveTo(n * .222222, n, 0, n * .777777, 0, n * .5), f.closePath(), e = f.createLinearGradient(0, 0, 0, n), e.addColorStop(0, "rgb(92, 95, 101)"), e.addColorStop(.47, "rgb(46, 49, 53)"), e.addColorStop(1, "rgb(22, 23, 26)"), f.fillStyle = e, f.fill(), f.beginPath(), f.moveTo(n * .055555, n * .5), f.bezierCurveTo(n * .055555, n * .277777, n * .277777, n * .055555, n * .5, n * .055555), f.bezierCurveTo(n * .722222, n * .055555, n * .944444, n * .277777, n * .944444, n * .5), f.bezierCurveTo(n * .944444, n * .722222, n * .722222, n * .944444, n * .5, n * .944444), f.bezierCurveTo(n * .277777, n * .944444, n * .055555, n * .722222, n * .055555, n * .5), f.closePath(), e = f.createLinearGradient(0, .055555 * n, 0, .944443 * n);
                    switch (u.style) {
                        case "black":
                            e.addColorStop(0, "rgb(43, 42, 47)"), e.addColorStop(1, "rgb(26, 27, 32)");
                            break;
                        case "brass":
                            e.addColorStop(0, "rgb(150, 110, 54)"), e.addColorStop(1, "rgb(124, 95, 61)");
                            break;
                        case "silver":
                        default:
                            e.addColorStop(0, "rgb(204, 204, 204)"), e.addColorStop(1, "rgb(87, 92, 98)")
                    }
                    f.fillStyle = e, f.fill(), f.beginPath(), f.moveTo(n * .777777, n * .833333), f.bezierCurveTo(n * .722222, n * .722222, n * .611111, n * .666666, n * .5, n * .666666), f.bezierCurveTo(n * .388888, n * .666666, n * .277777, n * .722222, n * .222222, n * .833333), f.bezierCurveTo(n * .277777, n * .888888, n * .388888, n * .944444, n * .5, n * .944444), f.bezierCurveTo(n * .611111, n * .944444, n * .722222, n * .888888, n * .777777, n * .833333), f.closePath(), e = f.createRadialGradient(.555555 * n, .944444 * n, 0, .555555 * n, .944444 * n, .388888 * n), e.addColorStop(0, "rgba(255, 255, 255, 0.6)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), f.fillStyle = e, f.fill(), f.beginPath(), f.moveTo(n * .944444, n * .277777), f.bezierCurveTo(n * .833333, n * .111111, n * .666666, 0, n * .5, 0), f.bezierCurveTo(n * .333333, 0, n * .166666, n * .111111, n * .055555, n * .277777), f.bezierCurveTo(n * .166666, n * .333333, n * .333333, n * .388888, n * .5, n * .388888), f.bezierCurveTo(n * .666666, n * .388888, n * .833333, n * .333333, n * .944444, n * .277777), f.closePath(), e = f.createRadialGradient(.5 * n, 0, 0, .5 * n, 0, .583333 * n), e.addColorStop(0, "rgba(255, 255, 255, 0.749019)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), f.fillStyle = e, f.fill(), f.beginPath(), f.moveTo(n * .277777, n * .555555), f.bezierCurveTo(n * .277777, n * .388888, n * .388888, n * .277777, n * .5, n * .277777), f.bezierCurveTo(n * .611111, n * .277777, n * .777777, n * .388888, n * .777777, n * .555555), f.bezierCurveTo(n * .777777, n * .666666, n * .611111, n * .777777, n * .5, n * .777777), f.bezierCurveTo(n * .388888, n * .777777, n * .277777, n * .666666, n * .277777, n * .555555), f.closePath(), e = f.createLinearGradient(0, .277777 * n, 0, .722221 * n), e.addColorStop(0, "#000000"), e.addColorStop(1, "rgb(204, 204, 204)"), f.fillStyle = e, f.fill(), f.beginPath(), f.moveTo(n * .333333, n * .555555), f.bezierCurveTo(n * .333333, n * .444444, n * .388888, n * .333333, n * .5, n * .333333), f.bezierCurveTo(n * .611111, n * .333333, n * .722222, n * .444444, n * .722222, n * .555555), f.bezierCurveTo(n * .722222, n * .611111, n * .611111, n * .722222, n * .5, n * .722222), f.bezierCurveTo(n * .388888, n * .722222, n * .333333, n * .611111, n * .333333, n * .555555), f.closePath(), e = f.createLinearGradient(0, .333333 * n, 0, .666666 * n), e.addColorStop(0, "rgb(10, 9, 1)"), e.addColorStop(1, "rgb(42, 41, 37)"), f.fillStyle = e, f.fill();
                    break;
                case "standardKnob":
                    e = f.createLinearGradient(0, 0, 0, n), e.addColorStop(0, "rgb(180, 180, 180)"), e.addColorStop(.46, "rgb(63, 63, 63)"), e.addColorStop(1, "rgb(40, 40, 40)"), f.fillStyle = e, f.beginPath(), f.arc(o, s, n / 2, 0, i, !0), f.closePath(), f.fill(), e = f.createLinearGradient(0, n - n * .77, 0, n - n * .77 + n * .77);
                    switch (u.style) {
                        case "black":
                            e.addColorStop(0, "rgb(191, 191, 191)"), e.addColorStop(.5, "rgb(45, 44, 49)"), e.addColorStop(1, "rgb(125, 126, 128)");
                            break;
                        case "brass":
                            e.addColorStop(0, "rgb(223, 208, 174)"), e.addColorStop(.5, "rgb(123, 95, 63)"), e.addColorStop(1, "rgb(207, 190, 157)");
                            break;
                        case "silver":
                        default:
                            e.addColorStop(0, "rgb(215, 215, 215)"), e.addColorStop(.5, "rgb(116, 116, 116)"), e.addColorStop(1, "rgb(215, 215, 215)")
                    }
                    f.fillStyle = e, f.beginPath(), f.arc(o, s, n * .77 / 2, 0, i, !0), f.closePath(), f.fill(), e = f.createRadialGradient(o, s, 0, o, s, n * .77 / 2), e.addColorStop(0, "rgba(0, 0, 0, 0)"), e.addColorStop(.75, "rgba(0, 0, 0, 0)"), e.addColorStop(.76, "rgba(0, 0, 0, 0.01)"), e.addColorStop(1, "rgba(0, 0, 0, 0.2)"), f.fillStyle = e, f.beginPath(), f.arc(o, s, n * .77 / 2, 0, i, !0), f.closePath(), f.fill()
            }
            y.cache[c] = h
        }
        return y.cache[c]
    }, y.cache = {}, c = function(n, r, u) {
        var l, f, s = n / 2,
            h = n / 2,
            e, a = n.toString() + r + u.outerColor_ON;
        if (!c.cache[a]) {
            l = t(n, n), f = l.getContext("2d");
            switch (r) {
                case 0:
                    e = f.createRadialGradient(s, h, 0, s, h, n * .5 / 2), e.addColorStop(0, u.innerColor1_OFF), e.addColorStop(.2, u.innerColor2_OFF), e.addColorStop(1, u.outerColor_OFF), f.fillStyle = e, f.beginPath(), f.arc(s, h, n * .5 / 2, 0, i, !0), f.closePath(), f.fill(), e = f.createRadialGradient(s, h, 0, s, h, n * .5 / 2), e.addColorStop(0, "rgba(0, 0, 0, 0)"), e.addColorStop(.8, "rgba(0, 0, 0, 0)"), e.addColorStop(1, "rgba(0, 0, 0, 0.4)"), f.fillStyle = e, f.beginPath(), f.arc(s, h, n * .5 / 2, 0, i, !0), f.closePath(), f.fill(), e = f.createLinearGradient(0, .35 * n, 0, .35 * n + .15 * n), e.addColorStop(0, "rgba(255, 255, 255, 0.4)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), f.fillStyle = e, f.beginPath(), f.arc(s, .35 * n + .2 * n / 2, n * .2, 0, i, !0), f.closePath(), f.fill();
                    break;
                case 1:
                    e = f.createRadialGradient(s, h, 0, s, h, n * .5 / 2), e.addColorStop(0, u.innerColor1_ON), e.addColorStop(.2, u.innerColor2_ON), e.addColorStop(1, u.outerColor_ON), f.fillStyle = e, f.beginPath(), f.arc(s, h, n * .5 / 2, 0, i, !0), f.closePath(), f.fill(), e = f.createRadialGradient(s, h, 0, s, h, n * .5 / 2), e.addColorStop(0, "rgba(0, 0, 0, 0)"), e.addColorStop(.8, "rgba(0, 0, 0, 0)"), e.addColorStop(1, "rgba(0, 0, 0, 0.4)"), f.fillStyle = e, f.beginPath(), f.arc(s, h, n * .5 / 2, 0, i, !0), f.closePath(), f.fill(), e = f.createLinearGradient(0, .35 * n, 0, .35 * n + .15 * n), e.addColorStop(0, "rgba(255, 255, 255, 0.4)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), f.fillStyle = e, f.beginPath(), f.arc(s, .35 * n + .2 * n / 2, n * .2, 0, i, !0), f.closePath(), f.fill(), e = f.createRadialGradient(s, h, 0, s, h, n / 2), e.addColorStop(0, o(u.coronaColor, 0).color), e.addColorStop(.6, o(u.coronaColor, .4).color), e.addColorStop(.7, o(u.coronaColor, .25).color), e.addColorStop(.8, o(u.coronaColor, .15).color), e.addColorStop(.85, o(u.coronaColor, .05).color), e.addColorStop(1, o(u.coronaColor, 0).color), f.fillStyle = e, f.beginPath(), f.arc(s, h, n / 2, 0, i, !0), f.closePath(), f.fill()
            }
            c.cache[a] = l
        }
        return c.cache[a]
    }, c.cache = {}, g = function(n, i, r) {
        var e, f, y = 0,
            o = 0,
            p = n,
            c = i,
            a = Math.min(n, i) * .095,
            u, w = 1,
            s = 1,
            b = n - 2,
            v = i - 2,
            k = a - 1,
            h = n.toString() + i + JSON.stringify(r);
        return g.cache[h] || (e = t(n, i), f = e.getContext("2d"), u = f.createLinearGradient(0, o, 0, o + c), u.addColorStop(0, "#4c4c4c"), u.addColorStop(.08, "#666666"), u.addColorStop(.92, "#666666"), u.addColorStop(1, "#e6e6e6"), f.fillStyle = u, l(f, y, o, p, c, a), f.fill(), u = f.createLinearGradient(0, s, 0, s + v), u.addColorStop(0, r.gradientStartColor), u.addColorStop(.03, r.gradientFraction1Color), u.addColorStop(.49, r.gradientFraction2Color), u.addColorStop(.5, r.gradientFraction3Color), u.addColorStop(1, r.gradientStopColor), f.fillStyle = u, l(f, w, s, b, v, k), f.fill(), g.cache[h] = e), g.cache[h]
    }, g.cache = {}, p = function(n, t, i, r) {
        var e, u, o = n.toString() + t + i + r;
        return p.cache[o] || (e = f.createElement("canvas"), u = e.getContext("2d"), e.width = n, e.height = n, u.fillStyle = t, i ? (u.beginPath(), u.moveTo(n * .5, n), u.lineTo(0, 0), u.lineTo(n, 0), u.closePath(), u.fill()) : r ? (u.beginPath(), u.moveTo(n, n * .5), u.lineTo(0, 0), u.lineTo(0, n), u.closePath(), u.fill()) : (u.beginPath(), u.moveTo(n * .5, 0), u.lineTo(n, n), u.lineTo(0, n), u.closePath(), u.fill()), p.cache[o] = e), p.cache[o]
    }, p.cache = {}, it = function(n, r, u) {
        var e = n * 2,
            h, f, s, c = r.state + n + JSON.stringify(u),
            l = function() {
                var t = u[0];
                r.state === "up" ? (s = f.createRadialGradient(.5 * n, .2 * e, 0, .5 * n, .2 * e, .5 * n), s.addColorStop(0, t.innerColor1_ON), s.addColorStop(.2, t.innerColor2_ON), s.addColorStop(1, t.outerColor_ON)) : (s = f.createLinearGradient(0, 0, 0, .5 * e), s.addColorStop(0, "#323232"), s.addColorStop(1, "#5c5c5c")), f.fillStyle = s, f.beginPath(), f.moveTo(.5 * n, 0), f.lineTo(n, .2 * e), f.lineTo(.752 * n, .2 * e), f.lineTo(.752 * n, .37 * e), f.lineTo(.252 * n, .37 * e), f.lineTo(.252 * n, .2 * e), f.lineTo(0, .2 * e), f.closePath(), f.fill(), r.state !== "up" ? (f.strokeStyle = "rgba(0, 0, 0, 0.4)", f.beginPath(), f.moveTo(0, .2 * e), f.lineTo(.5 * n, 0), f.lineTo(n, .2 * e), f.moveTo(.252 * n, .2 * e), f.lineTo(.252 * n, .37 * e), f.stroke(), f.strokeStyle = "rgba(255, 255, 255, 0.3)", f.beginPath(), f.moveTo(.252 * n, .37 * e), f.lineTo(.752 * n, .37 * e), f.lineTo(.752 * n, .2 * e), f.lineTo(n, .2 * e), f.stroke()) : (s = f.createRadialGradient(.5 * n, .2 * e, 0, .5 * n, .2 * e, .7 * n), s.addColorStop(0, o(t.coronaColor, 0).color), s.addColorStop(.5, o(t.coronaColor, .3).color), s.addColorStop(.7, o(t.coronaColor, .2).color), s.addColorStop(.8, o(t.coronaColor, .1).color), s.addColorStop(.85, o(t.coronaColor, .05).color), s.addColorStop(1, o(t.coronaColor, 0).color), f.fillStyle = s, f.beginPath(), f.arc(.5 * n, .2 * e, .7 * n, 0, i, !0), f.closePath(), f.fill())
            },
            a = function() {
                var t = u[1];
                f.beginPath(), r.state === "steady" ? (s = t.outerColor_ON, f.fillStyle = s, f.rect(.128 * n, .41 * e, .744 * n, .074 * e), f.rect(.128 * n, .516 * e, .744 * n, .074 * e), f.closePath(), f.fill()) : (s = f.createLinearGradient(0, .41 * e, 0, .41 * e + .074 * e), s.addColorStop(0, "#323232"), s.addColorStop(1, "#5c5c5c"), f.fillStyle = s, f.rect(.128 * n, .41 * e, .744 * n, .074 * e), f.closePath(), f.fill(), s = f.createLinearGradient(0, .516 * e, 0, .516 * e + .074 * e), s.addColorStop(0, "#323232"), s.addColorStop(1, "#5c5c5c"), f.fillStyle = s, f.rect(.128 * n, .516 * e, .744 * n, .074 * e), f.closePath(), f.fill()), r.state !== "steady" ? (f.strokeStyle = "rgba(0, 0, 0, 0.4)", f.beginPath(), f.moveTo(.128 * n, .41 * e + .074 * e), f.lineTo(.128 * n, .41 * e), f.lineTo(.128 * n + .744 * n, .41 * e), f.stroke(), f.beginPath(), f.moveTo(.128 * n, .516 * e + .074 * e), f.lineTo(.128 * n, .516 * e), f.lineTo(.128 * n + .744 * n, .516 * e), f.stroke(), f.strokeStyle = "rgba(255, 255, 255, 0.3)", f.beginPath(), f.moveTo(.128 * n + .744 * n, .41 * e), f.lineTo(.128 * n + .744 * n, .41 * e + .074 * e), f.lineTo(.128 * n, .41 * e + .074 * e), f.stroke(), f.beginPath(), f.moveTo(.128 * n + .744 * n, .516 * e), f.lineTo(.128 * n + .744 * n, .516 * e + .074 * e), f.lineTo(.128 * n, .516 * e + .074 * e), f.stroke()) : (s = f.createRadialGradient(.5 * n, .5 * e, 0, .5 * n, .5 * e, .7 * n), s.addColorStop(0, o(t.coronaColor, 0).color), s.addColorStop(.5, o(t.coronaColor, .3).color), s.addColorStop(.7, o(t.coronaColor, .2).color), s.addColorStop(.8, o(t.coronaColor, .1).color), s.addColorStop(.85, o(t.coronaColor, .05).color), s.addColorStop(1, o(t.coronaColor, 0).color), f.fillStyle = s, f.beginPath(), f.arc(.5 * n, .5 * e, .7 * n, 0, i, !0), f.closePath(), f.fill())
            },
            v = function() {
                var t = u[2];
                r.state === "down" ? (s = f.createRadialGradient(.5 * n, .8 * e, 0, .5 * n, .8 * e, .5 * n), s.addColorStop(0, t.innerColor1_ON), s.addColorStop(.2, t.innerColor2_ON), s.addColorStop(1, t.outerColor_ON)) : (s = f.createLinearGradient(0, .63 * e, 0, e), s.addColorStop(0, "#323232"), s.addColorStop(1, "#5c5c5c")), f.beginPath(), f.fillStyle = s, f.moveTo(.5 * n, e), f.lineTo(n, .8 * e), f.lineTo(.725 * n, .8 * e), f.lineTo(.725 * n, .63 * e), f.lineTo(.252 * n, .63 * e), f.lineTo(.252 * n, .8 * e), f.lineTo(0, .8 * e), f.closePath(), f.fill(), r.state !== "down" ? (f.strokeStyle = "rgba(0, 0, 0, 0.4)", f.beginPath(), f.moveTo(0, .8 * e), f.lineTo(.252 * n, .8 * e), f.moveTo(.252 * n, .63 * e), f.lineTo(.752 * n, .63 * e), f.stroke(), f.beginPath(), f.moveTo(.752 * n, .8 * e), f.lineTo(n, .8 * e), f.stroke(), f.strokeStyle = "rgba(255, 255, 255, 0.3)", f.beginPath(), f.moveTo(0, .8 * e), f.lineTo(.5 * n, e), f.lineTo(n, .8 * e), f.stroke(), f.beginPath(), f.moveTo(.752 * n, .8 * e), f.lineTo(.752 * n, .63 * e), f.stroke()) : (s = f.createRadialGradient(.5 * n, .8 * e, 0, .5 * n, .8 * e, .7 * n), s.addColorStop(0, o(t.coronaColor, 0).color), s.addColorStop(.5, o(t.coronaColor, .3).color), s.addColorStop(.7, o(t.coronaColor, .2).color), s.addColorStop(.8, o(t.coronaColor, .1).color), s.addColorStop(.85, o(t.coronaColor, .05).color), s.addColorStop(1, o(t.coronaColor, 0).color), f.fillStyle = s, f.beginPath(), f.arc(.5 * n, .8 * e, .7 * n, 0, i, !0), f.closePath(), f.fill())
            };
        if (!it.cache[c]) {
            h = t(n * 2, n * 4), f = h.getContext("2d"), f.translate(n * .5, n * .5);
            switch (r.state) {
                case "up":
                    v(), a(), l();
                    break;
                case "steady":
                    v(), l(), a();
                    break;
                case "down":
                default:
                    l(), a(), v()
            }
            it.cache[c] = h
        }
        return it.cache[c]
    }, it.cache = {};
    var yt = function(n, t, i, r, u, f, e, o, s, h) {
            h = undefined === h ? h = steelseries.GaugeType.TYPE1 : h, n.save(), n.textAlign = o ? "center" : "left", n.textBaseline = "middle", n.strokeStyle = f.labelColor.getRgbaColor(), n.fillStyle = f.labelColor.getRgbaColor(), o ? (n.font = .046728 * t + "px sans-serif", n.fillText(r, t / 2, i * .3, t * .3), n.fillText(u, t / 2, i * .38, t * .3)) : e ? (n.font = .1 * t + "px sans-serif", n.save(), n.translate(.671428 * t, .1375 * i), n.rotate(1.570796), n.fillText(r, 0, 0), n.translate(-.671428 * t, -.1375 * i), n.restore(), n.font = .071428 * t + "px sans-serif", s ? h.type === "type2" ? (n.textAlign = "right", n.fillText(u, .36 * t, i * .79, t * .25)) : n.fillText(u, .63 * t, i * .85, t * .2) : (n.textAlign = "center", h.type === "type2" ? n.fillText(u, t / 2, i * .92, t * .2) : n.fillText(u, t / 2, i * .89, t * .2))) : (n.font = .035 * t + "px sans-serif", n.fillText(r, t * .15, i * .25, t * .3), n.font = .025 * t + "px sans-serif", n.fillText(u, t * .0625, i * .7, t * .07)), n.restore()
        },
        li = ei(12, 12, function(n) {
            var u = n.canvas.width,
                t = n.canvas.height,
                f = 0,
                r = 0,
                i;
            n.save(), n.save(), n.beginPath(), n.rect(0, 0, u * .5, t * .5), n.closePath(), n.restore(), i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t), i.addColorStop(0, "rgb(35, 35, 35)"), i.addColorStop(1, "rgb(23, 23, 23)"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(u * .083333, 0, u * .333333, t * .416666), n.closePath(), n.restore(), f = .083333, r = 0, i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t), i.addColorStop(0, "rgb(38, 38, 38)"), i.addColorStop(1, "rgb(30, 30, 30)"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(u * .5, t * .5, u * .5, t * .5), n.closePath(), n.restore(), f = .5, r = .5, i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t), i.addColorStop(0, "rgb(35, 35, 35)"), i.addColorStop(1, "rgb(23, 23, 23)"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(u * .583333, t * .5, u * .333333, t * .416666), n.closePath(), n.restore(), f = .583333, r = .5, i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t), i.addColorStop(0, "rgb(38, 38, 38)"), i.addColorStop(1, "rgb(30, 30, 30)"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(u * .5, 0, u * .5, t * .5), n.closePath(), n.restore(), f = .5, r = 0, i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t), i.addColorStop(0, "#303030"), i.addColorStop(1, "rgb(40, 40, 40)"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(u * .583333, t * .083333, u * .333333, t * .416666), n.closePath(), n.restore(), f = .583333, r = .083333, i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t), i.addColorStop(0, "rgb(53, 53, 53)"), i.addColorStop(1, "rgb(45, 45, 45)"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(0, t * .5, u * .5, t * .5), n.closePath(), n.restore(), f = 0, r = .5, i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t), i.addColorStop(0, "#303030"), i.addColorStop(1, "#282828"), n.fillStyle = i, n.fill(), n.save(), n.beginPath(), n.rect(u * .083333, t * .583333, u * .333333, t * .416666), n.closePath(), n.restore(), f = .083333, r = .583333, i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t), i.addColorStop(0, "#353535"), i.addColorStop(1, "#2d2d2d"), n.fillStyle = i, n.fill(), n.restore()
        }),
        ai = ei(15, 15, function(n) {
            var i = n.canvas.width,
                t = n.canvas.height,
                r;
            n.save(), n.save(), n.beginPath(), n.rect(0, 0, i, t), n.closePath(), n.restore(), n.fillStyle = "#1D2123", n.fill(), n.save(), n.beginPath(), n.moveTo(0, t * .266666), n.bezierCurveTo(0, t * .4, i * .066666, t * .466666, i * .2, t * .466666), n.bezierCurveTo(i * .333333, t * .466666, i * .4, t * .4, i * .4, t * .266666), n.bezierCurveTo(i * .4, t * .133333, i * .333333, t * .066666, i * .2, t * .066666), n.bezierCurveTo(i * .066666, t * .066666, 0, t * .133333, 0, t * .266666), n.closePath(), r = n.createLinearGradient(0, .066666 * t, 0, .466666 * t), r.addColorStop(0, "#000000"), r.addColorStop(1, "#444444"), n.fillStyle = r, n.fill(), n.save(), n.beginPath(), n.moveTo(0, t * .2), n.bezierCurveTo(0, t * .333333, i * .066666, t * .4, i * .2, t * .4), n.bezierCurveTo(i * .333333, t * .4, i * .4, t * .333333, i * .4, t * .2), n.bezierCurveTo(i * .4, t * .066666, i * .333333, 0, i * .2, 0), n.bezierCurveTo(i * .066666, 0, 0, t * .066666, 0, t * .2), n.closePath(), n.fillStyle = "#050506", n.fill(), n.save(), n.beginPath(), n.moveTo(i * .466666, t * .733333), n.bezierCurveTo(i * .466666, t * .866666, i * .533333, t * .933333, i * .666666, t * .933333), n.bezierCurveTo(i * .8, t * .933333, i * .866666, t * .866666, i * .866666, t * .733333), n.bezierCurveTo(i * .866666, t * .6, i * .8, t * .533333, i * .666666, t * .533333), n.bezierCurveTo(i * .533333, t * .533333, i * .466666, t * .6, i * .466666, t * .733333), n.closePath(), r = n.createLinearGradient(0, .533333 * t, 0, .933333 * t), r.addColorStop(0, "#000000"), r.addColorStop(1, "#444444"), n.fillStyle = r, n.fill(), n.save(), n.beginPath(), n.moveTo(i * .466666, t * .666666), n.bezierCurveTo(i * .466666, t * .8, i * .533333, t * .866666, i * .666666, t * .866666), n.bezierCurveTo(i * .8, t * .866666, i * .866666, t * .8, i * .866666, t * .666666), n.bezierCurveTo(i * .866666, t * .533333, i * .8, t * .466666, i * .666666, t * .466666), n.bezierCurveTo(i * .533333, t * .466666, i * .466666, t * .533333, i * .466666, t * .666666), n.closePath(), n.fillStyle = "#050506", n.fill(), n.restore()
        }),
        vi = function(n, i, r, u, f) {
            function o(n, t) {
                return n += (2 * Math.random() - 1) * t | 0, n < 0 ? 0 : n > 255 ? 255 : n
            }

            function s(n) {
                return n < 0 ? 0 : n > 255 ? 255 : n
            }

            function h(n, t, i, r, u, f) {
                var o, v, e, a, s, h, c, l;
                for (u >= i && (u = i - 1), a = 1 / (u * 2 + 1), s = 0, v = 0; v < r; v++) {
                    for (h = c = l = 0, o = 0; o < u; o++) e = (s + o) * 4, h += n.data[e], c += n.data[e + 1], l += n.data[e + 2];
                    for (o = 0; o < i; o++) o > u && (e = (s - u - 1) * 4, h -= n.data[e], c -= n.data[e + 1], l -= n.data[e + 2]), o + u < i && (e = (s + u) * 4, h += n.data[e], c += n.data[e + 1], l += n.data[e + 2]), e = s * 4, t.data[e] = h * a | 0, t.data[e + 1] = c * a | 0, t.data[e + 2] = l * a | 0, t.data[e + 3] = f, s++
                }
            }
            return this.fill = function(c, l, a, v) {
                var k, d, nt, ot, p, b, st, g, y, ht, ct = 255,
                    lt = n >> 16 & 255,
                    at = n >> 8 & 255,
                    vt = n & 255,
                    tt = 0,
                    it = 255 * r,
                    yt, pt, wt, w, rt, ut, ft, et;
                if (c = Math.floor(c), l = Math.floor(l), a = Math.ceil(a), v = Math.ceil(v), p = a - c, b = v - l, st = t(p, b), g = st.getContext("2d"), y = g.createImageData(p, b), ht = g.createImageData(p, b), f !== 0)
                    for (ot = [], k = 0; k < p; k++) ot[k] = 255 * f * Math.sin(k / p * e) | 0;
                for (nt = 0; nt < b; nt++)
                    for (i !== 0 && (yt = pt = wt = 0), d = 0; d < p; d++) w = nt * p * 4 + d * 4, rt = lt, ut = at, ft = vt, f !== 0 && (et = ot[d], rt += et, ut += et, ft += et), u ? (tt = (2 * Math.random() - 1) * it | 0, y.data[w] = s(rt + tt), y.data[w + 1] = s(ut + tt), y.data[w + 2] = s(ft + tt), y.data[w + 3] = ct) : (y.data[w] = o(rt, it), y.data[w + 1] = o(ut, it), y.data[w + 2] = o(ft, it), y.data[w + 3] = ct);
                return i > 0 ? (h(y, ht, p, b, i, ct), g.putImageData(ht, c, l)) : g.putImageData(y, c, l), st
            }, this
        },
        n = function(n, t, i, r) {
            function s() {
                u = tt(n, 255), f = tt(t, 255), e = tt(i, 255), o = tt(r, 1)
            }
            var u, f, e, o;
            arguments.length === 1 ? (i = parseInt(n.substr(5, 2), 16), t = parseInt(n.substr(3, 2), 16), n = parseInt(n.substr(1, 2), 16), r = 1) : arguments.length === 3 && (r = 1), s(), this.getRed = function() {
                return u
            }, this.setRed = function(n) {
                u = tt(n, 255)
            }, this.getGreen = function() {
                return f
            }, this.setGreen = function(n) {
                f = tt(n, 255)
            }, this.getBlue = function() {
                return e
            }, this.setBlue = function(n) {
                e = tt(n, 255)
            }, this.getAlpha = function() {
                return o
            }, this.setAlpha = function(n) {
                o = tt(n, 1)
            }, this.getRgbaColor = function() {
                return "rgba(" + u + ", " + f + ", " + e + ", " + o + ")"
            }, this.getRgbColor = function() {
                return "rgb(" + u + ", " + f + ", " + e + ")"
            }, this.getHexColor = function() {
                return "#" + u.toString(16) + f.toString(16) + e.toString(16)
            }
        },
        ft = function(n, r) {
            for (var f = n.length - 1, u = 0; u <= f; u++) n[u] = i * n[u] - e;
            this.fillCircle = function(i, e, o, s, h) {
                var w, l = Math.ceil(h),
                    c = l * 2,
                    a, tt, v, y, b, k, it, g, p, d, nt, rt;
                for (a = i.createImageData(c, c), tt = 255, y = 0; y < c; y++)
                    for (k = l - y, it = k * k, v = 0; v < c; v++)
                        if (b = v - l, g = Math.sqrt(b * b + it), g <= l && g >= s) {
                            for (w = Math.atan2(b, k), u = 0; u < f; u++) w >= n[u] && w < n[u + 1] && (d = ii(r[u], r[u + 1], n[u + 1] - n[u], w - n[u], !0));
                            p = (c - y) * c * 4 + v * 4, a.data[p] = d[0], a.data[p + 1] = d[1], a.data[p + 2] = d[2], a.data[p + 3] = tt
                        } nt = t(c, c), rt = nt.getContext("2d"), rt.putImageData(a, 0, 0), i.drawImage(nt, e - l, o - l)
            }, this.fillRect = function(i, e, o, s, h, c, l) {
                var w, s = Math.ceil(s),
                    d = s / 2,
                    h = Math.ceil(h),
                    g = h / 2,
                    c = Math.ceil(c),
                    l = Math.ceil(l),
                    y, nt, a, v, tt, it, p, b, k, rt;
                for (y = i.createImageData(s, h), nt = 255, v = 0; v < h; v++)
                    for (it = g - v, a = 0; a < s; a++) {
                        for (v > l && v < h - l && a > c && a < s - c && (a = s - c), tt = a - d, w = Math.atan2(tt, it), u = 0; u < f; u++) w >= n[u] && w < n[u + 1] && (b = ii(r[u], r[u + 1], n[u + 1] - n[u], w - n[u], !0));
                        p = (h - v) * s * 4 + a * 4, y.data[p] = b[0], y.data[p + 1] = b[0], y.data[p + 2] = b[0], y.data[p + 3] = nt
                    }
                k = t(s, h), rt = k.getContext("2d"), rt.putImageData(y, 0, 0), i.drawImage(k, e - d, o - g)
            }
        },
        ti = function(n, t, i, r) {
            this.getColorAt = function(n) {
                var u = 0,
                    e = 0,
                    f = 1,
                    o = 1,
                    t, s;
                for (n = n < 0 ? 0 : n > 1 ? 1 : n, t = 0; t < i.length; t++) {
                    if (i[t] < n && u < i[t] && (u = i[t], e = t), i[t] === n) return r[t];
                    i[t] > n && f >= i[t] && (f = i[t], o = t)
                }
                return s = (n - u) / (f - u), ii(r[e], r[o], 1, s)
            }, this.getStart = function() {
                return n
            }, this.getEnd = function() {
                return t
            }
        };
    Math.log10 = function(n) {
            return Math.log(n) / Math.LN10
        }, h = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(n) {
                window.setTimeout(n, 1e3 / 16)
            }
        }(),
        function() {
            v = function(n, t, i, r, u, f) {
                this.gradientStart = n, this.gradientFraction = t, this.gradientStop = i, this.labelColor = r, this.symbolColor = u, this.name = f
            }
        }(),
        function() {
            s = function(n, t, i, r, u, f) {
                this.gradientStartColor = n, this.gradientFraction1Color = t, this.gradientFraction2Color = i, this.gradientFraction3Color = r, this.gradientStopColor = u, this.textColor = f
            }
        }(),
        function() {
            nt = function(n, t, i, r, u, f) {
                this.veryDark = n, this.dark = t, this.medium = i, this.light = r, this.lighter = u, this.veryLight = f
            }
        }(),
        function() {
            ht = function(n, t, i, r, u, f, e) {
                this.innerColor1_ON = n, this.innerColor2_ON = t, this.outerColor_ON = i, this.coronaColor = r, this.innerColor1_OFF = u, this.innerColor2_OFF = f, this.outerColor_OFF = e
            }
        }(),
        function() {
            wt = function(n) {
                this.type = n
            }
        }(),
        function() {
            dt = function(n) {
                this.type = n
            }
        }(),
        function() {
            hi = function(n) {
                this.type = n
            }
        }(),
        function() {
            ri = function(n) {
                this.style = n
            }
        }(),
        function() {
            rt = function(n) {
                this.design = n
            }
        }(),
        function() {
            w = function(n) {
                this.type = n
            }
        }(),
        function() {
            bt = function(n) {
                this.type = n
            }
        }(),
        function() {
            ui = function(n) {
                this.format = n
            }
        }(),
        function() {
            fi = function(n) {
                this.type = n
            }
        }(),
        function() {
            gt = function(n) {
                this.state = n
            }
        }();
    var dr = {
            DARK_GRAY: new v(new n(0, 0, 0, 1), new n(51, 51, 51, 1), new n(153, 153, 153, 1), new n(255, 255, 255, 1), new n(180, 180, 180, 1), "DARK_GRAY"),
            SATIN_GRAY: new v(new n(45, 57, 57, 1), new n(45, 57, 57, 1), new n(45, 57, 57, 1), new n(167, 184, 180, 1), new n(137, 154, 150, 1), "SATIN_GRAY"),
            LIGHT_GRAY: new v(new n(130, 130, 130, 1), new n(181, 181, 181, 1), new n(253, 253, 253, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "LIGHT_GRAY"),
            WHITE: new v(new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "WHITE"),
            BLACK: new v(new n(0, 0, 0, 1), new n(0, 0, 0, 1), new n(0, 0, 0, 1), new n(255, 255, 255, 1), new n(150, 150, 150, 1), "BLACK"),
            BEIGE: new v(new n(178, 172, 150, 1), new n(204, 205, 184, 1), new n(231, 231, 214, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "BEIGE"),
            BROWN: new v(new n(245, 225, 193, 1), new n(245, 225, 193, 1), new n(255, 250, 240, 1), new n(109, 73, 47, 1), new n(89, 53, 27, 1), "BROWN"),
            RED: new v(new n(198, 93, 95, 1), new n(212, 132, 134, 1), new n(242, 218, 218, 1), new n(0, 0, 0, 1), new n(90, 0, 0, 1), "RED"),
            GREEN: new v(new n(65, 120, 40, 1), new n(129, 171, 95, 1), new n(218, 237, 202, 1), new n(0, 0, 0, 1), new n(0, 90, 0, 1), "GREEN"),
            BLUE: new v(new n(45, 83, 122, 1), new n(115, 144, 170, 1), new n(227, 234, 238, 1), new n(0, 0, 0, 1), new n(0, 0, 90, 1), "BLUE"),
            ANTHRACITE: new v(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(250, 250, 250, 1), new n(180, 180, 180, 1), "ANTHRACITE"),
            MUD: new v(new n(80, 86, 82, 1), new n(70, 76, 72, 1), new n(57, 62, 58, 1), new n(255, 255, 240, 1), new n(225, 225, 210, 1), "MUD"),
            PUNCHED_SHEET: new v(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(255, 255, 255, 1), new n(180, 180, 180, 1), "PUNCHED_SHEET"),
            CARBON: new v(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(255, 255, 255, 1), new n(180, 180, 180, 1), "CARBON"),
            STAINLESS: new v(new n(130, 130, 130, 1), new n(181, 181, 181, 1), new n(253, 253, 253, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "STAINLESS"),
            BRUSHED_METAL: new v(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "BRUSHED_METAL"),
            BRUSHED_STAINLESS: new v(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(110, 110, 112, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "BRUSHED_STAINLESS"),
            TURNED: new v(new n(130, 130, 130, 1), new n(181, 181, 181, 1), new n(253, 253, 253, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "TURNED")
        },
        gr = {
            BEIGE: new s("#c8c8b1", "rgb(241, 237, 207)", "rgb(234, 230, 194)", "rgb(225, 220, 183)", "rgb(237, 232, 191)", "#000000"),
            BLUE: new s("#ffffff", "rgb(231, 246, 255)", "rgb(170, 224, 255)", "rgb(136, 212, 255)", "rgb(192, 232, 255)", "#124564"),
            ORANGE: new s("#ffffff", "rgb(255, 245, 225)", "rgb(255, 217, 147)", "rgb(255, 201, 104)", "rgb(255, 227, 173)", "#503700"),
            RED: new s("#ffffff", "rgb(255, 225, 225)", "rgb(253, 152, 152)", "rgb(252, 114, 115)", "rgb(254, 178, 178)", "#4f0c0e"),
            YELLOW: new s("#ffffff", "rgb(245, 255, 186)", "rgb(210, 255, 0)", "rgb(158, 205, 0)", "rgb(210, 255, 0)", "#405300"),
            WHITE: new s("#ffffff", "#ffffff", "rgb(241, 246, 242)", "rgb(229, 239, 244)", "#ffffff", "#000000"),
            GRAY: new s("#414141", "rgb(117, 117, 117)", "rgb(87, 87, 87)", "#414141", "rgb(81, 81, 81)", "#ffffff"),
            BLACK: new s("#414141", "#666666", "#333333", "#000000", "#333333", "#cccccc"),
            GREEN: new s("rgb(33, 67, 67)", "rgb(33, 67, 67)", "rgb(29, 58, 58)", "rgb(28, 57, 57)", "rgb(23, 46, 46)", "rgba(0, 185, 165, 255)"),
            BLUE2: new s("rgb(0, 68, 103)", "rgb(8, 109, 165)", "rgb(0, 72, 117)", "rgb(0, 72, 117)", "rgb(0, 68, 103)", "rgb(111, 182, 228)"),
            BLUE_BLACK: new s("rgb(22, 125, 212)", "rgb(3, 162, 254)", "rgb(3, 162, 254)", "rgb(3, 162, 254)", "rgb(11, 172, 244)", "#000000"),
            BLUE_DARKBLUE: new s("rgb(18, 33, 88)", "rgb(18, 33, 88)", "rgb(19, 30, 90)", "rgb(17, 31, 94)", "rgb(21, 25, 90)", "rgb(23, 99, 221)"),
            BLUE_GRAY: new s("rgb(135, 174, 255)", "rgb(101, 159, 255)", "rgb(44, 93, 255)", "rgb(27, 65, 254)", "rgb(12, 50, 255)", "#b2b4ed"),
            STANDARD: new s("rgb(131, 133, 119)", "rgb(176, 183, 167)", "rgb(165, 174, 153)", "rgb(166, 175, 156)", "rgb(175, 184, 165)", "rgb(35, 42, 52)"),
            STANDARD_GREEN: new s("#ffffff", "rgb(219, 230, 220)", "rgb(179, 194, 178)", "rgb(153, 176, 151)", "rgb(114, 138, 109)", "#080C06"),
            BLUE_BLUE: new s("rgb(100, 168, 253)", "rgb(100, 168, 253)", "rgb(95, 160, 250)", "rgb(80, 144, 252)", "rgb(74, 134, 255)", "#002cbb"),
            RED_DARKRED: new s("rgb(72, 36, 50)", "rgb(185, 111, 110)", "rgb(148, 66, 72)", "rgb(83, 19, 20)", "rgb(7, 6, 14)", "#FE8B92"),
            DARKBLUE: new s("rgb(14, 24, 31)", "rgb(46, 105, 144)", "rgb(19, 64, 96)", "rgb(6, 20, 29)", "rgb(8, 9, 10)", "#3DB3FF"),
            LILA: new s("rgb(175, 164, 255)", "rgb(188, 168, 253)", "rgb(176, 159, 255)", "rgb(174, 147, 252)", "rgb(168, 136, 233)", "#076148"),
            BLACKRED: new s("rgb(8, 12, 11)", "rgb(10, 11, 13)", "rgb(11, 10, 15)", "rgb(7, 13, 9)", "rgb(9, 13, 14)", "#B50026"),
            DARKGREEN: new s("rgb(25, 85, 0)", "rgb(47, 154, 0)", "rgb(30, 101, 0)", "rgb(30, 101, 0)", "rgb(25, 85, 0)", "#233123"),
            AMBER: new s("rgb(182, 71, 0)", "rgb(236, 155, 25)", "rgb(212, 93, 5)", "rgb(212, 93, 5)", "rgb(182, 71, 0)", "#593A0A"),
            LIGHTBLUE: new s("rgb(125, 146, 184)", "rgb(197, 212, 231)", "rgb(138, 155, 194)", "rgb(138, 155, 194)", "rgb(125, 146, 184)", "#090051"),
            SECTIONS: new s("#b2b2b2", "#ffffff", "#c4c4c4", "#c4c4c4", "#b2b2b2", "#000000")
        },
        nu = {
            RED: new nt(new n(82, 0, 0, 1), new n(158, 0, 19, 1), new n(213, 0, 25, 1), new n(240, 82, 88, 1), new n(255, 171, 173, 1), new n(255, 217, 218, 1)),
            GREEN: new nt(new n(8, 54, 4, 1), new n(0, 107, 14, 1), new n(15, 148, 0, 1), new n(121, 186, 37, 1), new n(190, 231, 141, 1), new n(234, 247, 218, 1)),
            BLUE: new nt(new n(0, 11, 68, 1), new n(0, 73, 135, 1), new n(0, 108, 201, 1), new n(0, 141, 242, 1), new n(122, 200, 255, 1), new n(204, 236, 255, 1)),
            ORANGE: new nt(new n(118, 83, 30, 1), new n(215, 67, 0, 1), new n(240, 117, 0, 1), new n(255, 166, 0, 1), new n(255, 255, 128, 1), new n(255, 247, 194, 1)),
            YELLOW: new nt(new n(41, 41, 0, 1), new n(102, 102, 0, 1), new n(177, 165, 0, 1), new n(255, 242, 0, 1), new n(255, 250, 153, 1), new n(255, 252, 204, 1)),
            CYAN: new nt(new n(15, 109, 109, 1), new n(0, 109, 144, 1), new n(0, 144, 191, 1), new n(0, 174, 239, 1), new n(153, 223, 249, 1), new n(204, 239, 252, 1)),
            MAGENTA: new nt(new n(98, 0, 114, 1), new n(128, 24, 72, 1), new n(191, 36, 107, 1), new n(255, 48, 143, 1), new n(255, 172, 210, 1), new n(255, 214, 23, 1)),
            WHITE: new nt(new n(210, 210, 210, 1), new n(220, 220, 220, 1), new n(235, 235, 235, 1), new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(255, 255, 255, 1)),
            GRAY: new nt(new n(25, 25, 25, 1), new n(51, 51, 51, 1), new n(76, 76, 76, 1), new n(128, 128, 128, 1), new n(204, 204, 204, 1), new n(243, 243, 243, 1)),
            BLACK: new nt(new n(0, 0, 0, 1), new n(5, 5, 5, 1), new n(10, 10, 10, 1), new n(15, 15, 15, 1), new n(20, 20, 20, 1), new n(25, 25, 25, 1)),
            RAITH: new nt(new n(0, 32, 65, 1), new n(0, 65, 125, 1), new n(0, 106, 172, 1), new n(130, 180, 214, 1), new n(148, 203, 242, 1), new n(191, 229, 255, 1)),
            GREEN_LCD: new nt(new n(0, 55, 45, 1), new n(15, 109, 93, 1), new n(0, 185, 165, 1), new n(48, 255, 204, 1), new n(153, 255, 227, 1), new n(204, 255, 241, 1)),
            JUG_GREEN: new nt(new n(0, 56, 0, 1), new n(32, 69, 36, 1), new n(50, 161, 0, 1), new n(129, 206, 0, 1), new n(190, 231, 141, 1), new n(234, 247, 218, 1))
        },
        tu = {
            RED_LED: new ht("#FF9A89", "#FF9A89", "#FF3300", "#FF8D70", "#7E1C00", "#7E1C00", "#641B00"),
            GREEN_LED: new ht("#9AFF89", "#9AFF89", "#59FF2A", "#A5FF00", "#1C7E00", "#1C7E00", "#1B6400"),
            BLUE_LED: new ht("#899AFF", "#899AFF", "#0033FF", "#708DFF", "#001C7E", "#001C7E", "#001B64"),
            ORANGE_LED: new ht("#FEA23F", "#FEA23F", "#FD6C00", "#FD6C00", "#592800", "#592800", "#421F00"),
            YELLOW_LED: new ht("#FFFF62", "#FFFF62", "#FFFF00", "#FFFF00", "#6B6D00", "#6B6D00", "#515300"),
            CYAN_LED: new ht("#00FFFF", "#00FFFF", "#1BC3C3", "#00FFFF", "#083B3B", "#083B3B", "#052727"),
            MAGENTA_LED: new ht("#D300FF", "#D300FF", "#8600CB", "#C300FF", "#38004B", "#38004B", "#280035")
        },
        pi = {
            TYPE1: new wt("type1"),
            TYPE2: new wt("type2"),
            TYPE3: new wt("type3"),
            TYPE4: new wt("type4"),
            TYPE5: new wt("type5")
        },
        iu = {
            NORTH: new dt("north"),
            SOUTH: new dt("south"),
            EAST: new dt("east"),
            WEST: new dt("west")
        },
        wi = {
            STANDARD_KNOB: new hi("standardKnob"),
            METAL_KNOB: new hi("metalKnob")
        },
        bi = {
            BLACK: new ri("black"),
            BRASS: new ri("brass"),
            SILVER: new ri("silver")
        },
        ru = {
            BLACK_METAL: new rt("blackMetal"),
            METAL: new rt("metal"),
            SHINY_METAL: new rt("shinyMetal"),
            BRASS: new rt("brass"),
            STEEL: new rt("steel"),
            CHROME: new rt("chrome"),
            GOLD: new rt("gold"),
            ANTHRACITE: new rt("anthracite"),
            TILTED_GRAY: new rt("tiltedGray"),
            TILTED_BLACK: new rt("tiltedBlack"),
            GLOSSY_METAL: new rt("glossyMetal")
        },
        uu = {
            TYPE1: new w("type1"),
            TYPE2: new w("type2"),
            TYPE3: new w("type3"),
            TYPE4: new w("type4"),
            TYPE5: new w("type5"),
            TYPE6: new w("type6"),
            TYPE7: new w("type7"),
            TYPE8: new w("type8"),
            TYPE9: new w("type9"),
            TYPE10: new w("type10"),
            TYPE11: new w("type11"),
            TYPE12: new w("type12"),
            TYPE13: new w("type13"),
            TYPE14: new w("type14"),
            TYPE15: new w("type15"),
            TYPE16: new w("type16")
        },
        fu = {
            TYPE1: new bt("type1"),
            TYPE2: new bt("type2"),
            TYPE3: new bt("type3"),
            TYPE4: new bt("type4"),
            TYPE5: new bt("type5")
        },
        eu = {
            STANDARD: new ui("standard"),
            FRACTIONAL: new ui("fractional"),
            SCIENTIFIC: new ui("scientific")
        },
        ou = {
            NORMAL: new fi("normal"),
            HORIZONTAL: new fi("horizontal"),
            TANGENT: new fi("tangent")
        },
        su = {
            UP: new gt("up"),
            STEADY: new gt("steady"),
            DOWN: new gt("down"),
            OFF: new gt("off")
        };
    return {
        Radial: ki,
        RadialBargraph: di,
        RadialVertical: gi,
        Linear: nr,
        LinearBargraph: tr,
        DisplaySingle: ir,
        DisplayMulti: rr,
        Level: ur,
        Compass: fr,
        WindDirection: er,
        Horizon: or,
        Led: sr,
        Clock: hr,
        Battery: cr,
        StopWatch: lr,
        Altimeter: ar,
        TrafficLight: vr,
        LightBulb: yr,
        Odometer: pr,
        drawFrame: b,
        drawBackground: d,
        drawForeground: k,
        rgbaColor: n,
        ConicalGradient: ft,
        setAlpha: o,
        getColorFromFraction: ii,
        gradientWrapper: ti,
        BackgroundColor: dr,
        LcdColor: gr,
        ColorDef: nu,
        LedColor: tu,
        GaugeType: pi,
        Orientation: iu,
        FrameDesign: ru,
        PointerType: uu,
        ForegroundType: fu,
        KnobType: wi,
        KnobStyle: bi,
        LabelNumberFormat: eu,
        TickLabelOrientation: ou,
        TrendState: su,
        Section: wr
    }
}()
